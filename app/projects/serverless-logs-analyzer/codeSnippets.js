export const s3Code = `resource "aws_s3_bucket" "serverless_log_analyzer_bucket" {
  bucket        = var.s3_input_bucket_name
  force_destroy = true

  tags = {
    Name = var.s3_input_bucket_tag
  }
}

resource "aws_s3_bucket" "serverless_log_analyzer_output" {
  bucket        = var.s3_output_bucket_name
  force_destroy = true

  tags = {
    Name = var.s3_output_bucket_tag
  }
}
`;

export const s3VersioningCode = `resource "aws_s3_bucket_versioning" "serverless_log_analyzer_bucket_versioning" {
  bucket = aws_s3_bucket.serverless_log_analyzer_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "serverless_log_analyzer_output_versioning" {
  bucket = aws_s3_bucket.serverless_log_analyzer_output.id
  versioning_configuration {
    status = "Enabled"
  }
}`;

export const s3EncryptionCode = `resource "aws_s3_bucket_server_side_encryption_configuration" "serverless_log_analyzer_bucket_encryption" {
  bucket = aws_s3_bucket.serverless_log_analyzer_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "serverless_log_analyzer_output_encryption" {
  bucket = aws_s3_bucket.serverless_log_analyzer_output.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}`;

export const s3PublicAccessBlockCode = `resource "aws_s3_bucket_public_access_block" "serverless_log_analyzer_bucket_block" {
  bucket                  = aws_s3_bucket.serverless_log_analyzer_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


resource "aws_s3_bucket_public_access_block" "serverless_log_analyzer_output_block" {
  bucket                  = aws_s3_bucket.serverless_log_analyzer_output.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`;

export const iamRoleCode = `resource "aws_iam_role" "lambda_exec_role" {
    name = var.lambda_exec_role_name

    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = "sts:AssumeRole"
                Effect = "Allow"
                Principal = {
                    Service = "lambda.amazonaws.com"
                }
               
            }
        ]
    })
}`;

export const iamPolicyCode = `resource "aws_iam_role_policy" "lambda_exec_policy" {
    name = var.lambda_exec_policy_name
    role = aws_iam_role.lambda_exec_role.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            { 
                Action = [
                    "s3:GetObject",
                    "s3:ListBucket",
                    "s3:PutObject",
                    "s3:PutObjectAcl",
                    "s3:DeleteObject"
                ]
                Effect = "Allow"
                Resource = [
                    var.s3_input_bucket_arn,
                    var.s3_output_bucket_arn,
                    "\${var.s3_input_bucket_arn}/*",
                    "\${var.s3_output_bucket_arn}/*"
                ]
                
            }, 
            {
                Action = [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ]
                Effect = "Allow"
                Resource = "*"
            }
        ]
    })
}
`;

export const lambdaFunctionsCode = `resource "aws_lambda_function" "log_aggregator" {
  function_name = var.lambda_function_name_aggregator
  role          = var.lambda_exec_role_arn
  handler       = var.lambda_function_handler_aggregator
  runtime       = "python3.11"
  filename         = "\${path.module}/../../../lambda-aggregator.zip"
  source_code_hash = filebase64sha256("\${path.module}/../../../lambda-aggregator.zip")
  timeout = 30

  environment {
    variables = {
      BUCKET_NAME = var.s3_input_bucket_name
    }
  }

  tags = {
    Project = "log-aggregator"
  }
}

resource "aws_lambda_function" "log_processor" {
  function_name = var.lambda_function_name
  role          = var.lambda_exec_role_arn
  handler       = var.lambda_function_handler
  runtime       = "python3.11"
  filename         = "\${path.module}/../../../lambda-analyzer.zip"
  source_code_hash = filebase64sha256("\${path.module}/../../../lambda-analyzer.zip")
  timeout = 30

  environment {
    variables = {
      BUCKET_NAME = var.s3_input_bucket_name
    }
  }

  tags = {
    Project = "log-processor"
  }
}
`;

export const lambdaPermissionsCode = `resource "aws_lambda_permission" "allow_s3_trigger" {
  statement_id = "AllowExecutionFromS3"
  action = "lambda:InvokeFunction"
  principal = "s3.amazonaws.com"
  function_name = aws_lambda_function.log_processor.function_name
  source_arn = var.s3_input_bucket_arn
}
`;

export const lambdaTriggerCode = `resource "aws_s3_bucket_notification" "log_upload_notification" {
  bucket = var.s3_input_bucket_bucket

  depends_on = [aws_lambda_permission.allow_s3_trigger]

  lambda_function {
    lambda_function_arn = aws_lambda_function.log_processor.arn
    events              = ["s3:ObjectCreated:*"]
  }
}

`;

export const cloudTrailCode = `resource "aws_cloudtrail" "cloudtrail" {
    name = var.cloudtrail_name
    s3_bucket_name = var.s3_input_bucket_bucket
    is_multi_region_trail = var.is_multi_region_trail
    include_global_service_events = var.include_global_service_events
    enable_logging = var.enable_logging

    event_selector {
        include_management_events = var.include_management_events
        read_write_type = var.read_write_type
        data_resource {
            type = var.data_resource_type
            values = var.data_resource_values
        }
    }
    depends_on = [aws_s3_bucket_policy.logs_input]
}

`;

export const cloudTrailS3BucketPolicyCode = `resource "aws_s3_bucket_policy" "logs_input" {
  bucket = var.s3_input_bucket_bucket

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AWSCloudTrailWrite",
        Effect    = "Allow",
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        },
        Action    = "s3:PutObject",
        Resource  = "\${var.s3_input_bucket_arn}/AWSLogs/*", 
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      },
      {
        Sid       = "AWSCloudTrailRead",
        Effect    = "Allow",
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        },
        Action    = "s3:GetBucketAcl",
        Resource  = "\${var.s3_input_bucket_arn}"
      }
    ]
  })
}
`;

export const cloudwatchEventRuleCode = `resource "aws_cloudwatch_event_rule" "every_12_hours" {
  name        = var.eventbridge_name
  description = var.eventbridge_description
  schedule_expression = var.eventbridge_schedule_expression
}
`;

export const cloudwatchEventTargetCode = `resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.every_12_hours.name
  target_id = "logAggregator"
  arn       = var.lambda_function_arn

  input = jsonencode({
    account_id = var.account_id
  })
}
`;

export const cloudwatchLambdaPermissionCode = `resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_12_hours.arn
}
`;

export const mainCode = `data "aws_caller_identity" "current" {}

terraform {
    backend "s3" {
        bucket = "samuellincoln-serverless-log-analyzer-state"
        key = "terraform.tfstate"
        region = "us-east-1"
        dynamodb_table = "serverless-log-analyzer-locks"
        encrypt = true
    }

    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

module "s3" {
    source = "./modules/s3"
    s3_input_bucket_name = "samuellincoln-log-analyzer-input"
    s3_output_bucket_name = "samuellincoln-log-analyzer-output"
    s3_input_bucket_tag = "log-analyzer-input"
    s3_output_bucket_tag = "log-analyzer-output"
}

module "iam" {
    source = "./modules/iam"
    lambda_exec_role_name = "log-analyzer-role"
    lambda_exec_policy_name = "log-analyzer-policy"
    s3_input_bucket_arn = module.s3.s3_input_bucket_arn
    s3_output_bucket_arn = module.s3.s3_output_bucket_arn
}

module "lambda" {
    source = "./modules/lambda"
    lambda_function_name = "log-analyzer-function"
    lambda_function_handler = "handler.lambda_handler"
    lambda_exec_role_arn = module.iam.lambda_exec_role_arn
    s3_input_bucket_name = module.s3.s3_input_bucket_name
    s3_input_bucket_arn = module.s3.s3_input_bucket_arn
    s3_input_bucket_bucket = module.s3.s3_input_bucket_bucket
    lambda_function_name_aggregator = "log-aggregator-function"
    lambda_function_handler_aggregator = "handler.lambda_handler"
}   

module "cloudtrail" {
    source = "./modules/cloudtrail"
    cloudtrail_name = "log-analyzer-cloudtrail"
    s3_input_bucket_name = module.s3.s3_input_bucket_name
    s3_input_bucket_arn = module.s3.s3_input_bucket_arn
    s3_input_bucket_bucket = module.s3.s3_input_bucket_bucket
    is_multi_region_trail = true
    include_global_service_events = true
    enable_logging = true
    include_management_events = true
    read_write_type = "All"
    data_resource_type = "AWS::S3::Object"
    data_resource_values = ["arn:aws:s3:::\${module.s3.s3_input_bucket_arn}/*"]
    account_id = data.aws_caller_identity.current.account_id    
   
}

module "eventbridge" {
    source = "./modules/eventbridge"
    eventbridge_name = "log-aggregator-eventbridge"
    eventbridge_description = "EventBridge rule to trigger the log aggregator lambda function every 12 hours"
    eventbridge_schedule_expression = "cron(0 0/12 * * ? *)"
    lambda_function_arn = module.lambda.lambda_function_aggregator_arn
    lambda_function_name = module.lambda.lambda_function_aggregator_name
    account_id = data.aws_caller_identity.current.account_id
}

`;

export const aggregatorCodeTrigger = `def lambda_handler(event, context):
    print("aggregator called")
    bucket_name = 'samuellincoln-log-analyzer-input'
`;

export const aggregatorCodeDynamicPath = ` # Calculate current date
    current_date = datetime.utcnow()
    year = current_date.strftime("%Y")
    month = current_date.strftime("%m")
    day = current_date.strftime("%d")
    
    
    # Create dynamic prefix
    prefix = f'AWSLogs/{event["account_id"]}/CloudTrail/us-east-1/{year}/{month}/{day}/'
    print(f"dynamic prefix: {prefix}")
`;

export const aggregatorCodeFileDiscovery = ` # List objects in bucket with specified prefix
response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
print(f"list_objects_v2 response: {response.get('Contents', [])}")
for obj in response.get('Contents', []):
    print(f"analyzing object: {obj}")
    key = obj['Key']
    print(f"analyzing key: {key}")
    if key.endswith('.json.gz') and 'aggregated' not in key:

`;

export const aggregatorCodeDataAggregation = ` # Read and decompress file
    obj_data = s3.get_object(Bucket=bucket_name, Key=key)
    with gzip.GzipFile(fileobj=BytesIO(obj_data['Body'].read())) as gz:
        log_content = json.load(gz)
        aggregated_data.extend(log_content['Records'])
`;

export const aggregatorCodeOutputFile = `# Get current date and time to name the file
now = datetime.utcnow()
output_key = f"{now.strftime('%Y-%m-%d-%H:%M')}-aggregated.json.gz"
print(f"will save to bucket with path: {prefix}{output_key}")

# Compress and write aggregated file
out_buffer = BytesIO()
with gzip.GzipFile(fileobj=out_buffer, mode='w') as gz:
    gz.write(json.dumps({'Records': aggregated_data}).encode('utf-8'))

# Save aggregated file to S3
s3.put_object(Bucket=bucket_name, Key=f"{prefix}{output_key}", Body=out_buffer.getvalue())
`;

export const aggregatorCleanupCode = `# Delete old log files
for obj in response.get('Contents', []):
    key = obj['Key']
    print(f"will delete file: {key}")
    if key.endswith('.json.gz') and 'aggregated' not in key:
        s3.delete_object(Bucket=bucket_name, Key=key)
`;

export const aggregatorFullCode = `import boto3
import gzip
import json
from datetime import datetime
from io import BytesIO

s3 = boto3.client('s3')

def lambda_handler(event, context):
    print("aggregator called")
    bucket_name = 'samuellincoln-log-analyzer-input'
    
    # Calculate current date
    current_date = datetime.utcnow()
    year = current_date.strftime("%Y")
    month = current_date.strftime("%m")
    day = current_date.strftime("%d")
    
    
    # Create dynamic prefix
    prefix = f'AWSLogs/{event["account_id"]}/CloudTrail/us-east-1/{year}/{month}/{day}/'
    print(f"dynamic prefix: {prefix}")
    
    aggregated_data = []

    # List objects in bucket with specified prefix
    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
    print(f"list_objects_v2 response: {response.get('Contents', [])}")
    for obj in response.get('Contents', []):
        print(f"analyzing object: {obj}")
        key = obj['Key']
        print(f"analyzing key: {key}")
        if key.endswith('.json.gz') and 'aggregated' not in key:
            # Read and decompress file
            obj_data = s3.get_object(Bucket=bucket_name, Key=key)
            with gzip.GzipFile(fileobj=BytesIO(obj_data['Body'].read())) as gz:
                log_content = json.load(gz)
                aggregated_data.extend(log_content['Records'])

    # Get current date and time to name the file
    now = datetime.utcnow()
    output_key = f"{now.strftime('%Y-%m-%d-%H:%M')}-aggregated.json.gz"
    print(f"will save to bucket with path: {prefix}{output_key}")

    # Compress and write aggregated file
    out_buffer = BytesIO()
    with gzip.GzipFile(fileobj=out_buffer, mode='w') as gz:
        gz.write(json.dumps({'Records': aggregated_data}).encode('utf-8'))

    # Save aggregated file to S3
    s3.put_object(Bucket=bucket_name, Key=f"{prefix}{output_key}", Body=out_buffer.getvalue())
    
    # Delete old log files
    for obj in response.get('Contents', []):
        key = obj['Key']
        print(f"will delete file: {key}")
        if key.endswith('.json.gz') and 'aggregated' not in key:
            s3.delete_object(Bucket=bucket_name, Key=key)

    print("Logs aggregated and old logs deleted successfully")
    return {
        'statusCode': 200,
        'body': json.dumps('Logs aggregated and old logs deleted successfully')
    }
`;

export const aggregatorResultsBefore = `AWSLogs/123456789/CloudTrail/us-east-1/2025/07/15/
├── file1_20240115T1000Z.json.gz
├── file2_20240115T1100Z.json.gz
└── file3_20240115T1200Z.json.gz `;

export const aggregatorResultsAfter = `AWSLogs/123456789/CloudTrail/us-east-1/2025/07/15/
└── 2025-07-15-14:30-aggregated.json.gz`;

export const analyzerHandlerCode = `import boto3
import json
import gzip
import os
from urllib.parse import unquote

from exporter import export_to_json, export_to_csv
from analyzer import process_logs
s3 = boto3.client("s3")

def lambda_handler(event, context):
    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    print(f"[+] Bucket name: {bucket_name}")
    key = event["Records"][0]["s3"]["object"]["key"]
    print(f"[+] Key: {key}")

    key = unquote(key)
    
    base_filename = os.path.splitext(key.split('/')[-1])[0]
    
    local_gz_path = f"/tmp/{key.split('/')[-1]}"
    print(f"[+] Local gz path: {local_gz_path}")
    
    print(f"[+] Downloading file from s3")
    s3.download_file(bucket_name, key, local_gz_path)
    print(f"[+] File downloaded from s3")
    
    local_json_path = local_gz_path.replace('.gz', '')
    print(f"[+] Local json path: {local_json_path}")
    
    print(f"[+] Unzipping file")
    with gzip.open(local_gz_path, 'rt') as gz_file:
        with open(local_json_path, 'w') as json_file:
            json_file.write(gz_file.read())
    print(f"[+] File unzipped")
    if os.path.exists(local_json_path):
        print(f"[+] JSON file created at {local_json_path}")
    else:
        print(f"[-] JSON file not found at {local_json_path}")
    
    if "aggregated" in base_filename:
        insights = process_logs(local_json_path)
        
        base_filename = base_filename.replace('-aggregated.json', '')
        json_path = f"{local_json_path.rsplit('/', 1)[0]}/{base_filename}-insights.json"
        csv_path = f"{local_json_path.rsplit('/', 1)[0]}/{base_filename}-insights.csv"
      
        export_to_json(insights, json_path)
        export_to_csv(insights, csv_path)
        
        directory = '/'.join(key.split('/')[:-1])
        
        new_key_json = f"{directory}/{base_filename}-insights.json"
        new_key_csv = f"{directory}/{base_filename}-insights.csv"

        print(f"[+] Uploading insights to output s3 in path {new_key_json} and {new_key_csv}")
        s3.upload_file(json_path, "samuellincoln-log-analyzer-output", new_key_json)
        s3.upload_file(csv_path, "samuellincoln-log-analyzer-output", new_key_csv)
        print(f"[+] Insights uploaded to s3")
    else:
        print(f"[-] File {base_filename} does not contain 'aggregated', skipping processing.")
`;

export const analyzerAnalyzerCode = ` import json
from collections import Counter, defaultdict

def process_logs(filepath):
    with open(filepath, "r") as file:
        logs = json.load(file)
        
    event_counter = Counter()
    resource_counter = Counter()
    account_counter = Counter()
    region_counter = Counter()
    source_ip_counter = Counter()
    event_type_counter = Counter()
    event_category_counter = Counter()
    
    for record in logs["Records"]:
        event_name = record["eventName"]
        event_counter[event_name] += 1
        
        for resource in record.get("resources", []): 
            resource_name = resource.get("type") 
            resource_counter[resource_name] += 1
            
        region = record.get("awsRegion", None)
        if region:
            region_counter[region] += 1
            
        source_ip = record.get("sourceIPAddress", None)
        if source_ip:
            source_ip_counter[source_ip] += 1
            
        event_type = record.get("eventType", None)
        if event_type:
            event_type_counter[event_type] += 1
            
        event_category = record.get("eventCategory", None)
        if event_category:
            event_category_counter[event_category] += 1
    
        account_type = record.get("userIdentity", {}).get("type", "Unknown")
        account_counter[account_type] += 1
                   
    return {
        "event_counts": dict(event_counter),      
        "resource_counts": dict(resource_counter),
        "account_counts": dict(account_counter),       
        "region_counts": dict(region_counter),       
        "source_ip_counts": dict(source_ip_counter),        
        "event_type_counts": dict(event_type_counter),
        "event_category_counts": dict(event_category_counter),
        "total_events": len(logs["Records"]),
    }
`;

export const analyzerExporterCode = `import json
import csv
import os

def export_to_json(logs, path):
    with open(path, "w") as f:
        json.dump(logs, f, indent=2)
    print(f"[+] Exported JSON logs to {path}")

def export_to_csv(logs, path):
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["event_name", "count"])
        for event_name, count in logs["event_counts"].items():
            writer.writerow([event_name, count])
    print(f"[+] Exported CSV logs to {path}")
`;

export const analyzerHandlerTriggerCode = `def lambda_handler(event, context):
    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    print(f"[+] Bucket name: {bucket_name}")
    key = event["Records"][0]["s3"]["object"]["key"]
    print(f"[+] Key: {key}")
    
    key = unquote(key)
`;

export const analyzerDownloadCode = `base_filename = os.path.splitext(key.split('/')[-1])[0]
local_gz_path = f"/tmp/{key.split('/')[-1]}"
print(f"[+] Local gz path: {local_gz_path}")

print(f"[+] Downloading file from s3")
s3.download_file(bucket_name, key, local_gz_path)
print(f"[+] File downloaded from s3")
`;

export const analyzerDecompressionCode = `local_json_path = local_gz_path.replace('.gz', '')
print(f"[+] Local json path: {local_json_path}")

print(f"[+] Unzipping file")
with gzip.open(local_gz_path, 'rt') as gz_file:
    with open(local_json_path, 'w') as json_file:
        json_file.write(gz_file.read())
print(f"[+] File unzipped")
`;

export const analyzerValidationCode = `if "aggregated" in base_filename:
    insights = process_logs(local_json_path)
    
    base_filename = base_filename.replace('-aggregated.json', '')
    json_path = f"{local_json_path.rsplit('/', 1)[0]}/{base_filename}-insights.json"
    csv_path = f"{local_json_path.rsplit('/', 1)[0]}/{base_filename}-insights.csv"
`;

export const analyzerAnalysisCode = `# From analyzer.py
def process_logs(filepath):
    with open(filepath, "r") as file:
        logs = json.load(file)
        
    event_counter = Counter()
    resource_counter = Counter()
    account_counter = Counter()
    region_counter = Counter()
    source_ip_counter = Counter()
    event_type_counter = Counter()
    event_category_counter = Counter()

`;

export const analyzerExportCode = `export_to_json(insights, json_path)
export_to_csv(insights, csv_path)

# From exporter.py
def export_to_json(logs, path):
    with open(path, "w") as f:
        json.dump(logs, f, indent=2)

def export_to_csv(logs, path):
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["event_name", "count"])
        for event_name, count in logs["event_counts"].items():
            writer.writerow([event_name, count])

`;

export const analyzerUploadCode = `directory = '/'.join(key.split('/')[:-1])
new_key_json = f"{directory}/{base_filename}-insights.json"
new_key_csv = f"{directory}/{base_filename}-insights.csv"

print(f"[+] Uploading insights to output s3 in path {new_key_json} and {new_key_csv}")
s3.upload_file(json_path, "samuellincoln-log-analyzer-output", new_key_json)
s3.upload_file(csv_path, "samuellincoln-log-analyzer-output", new_key_csv)
print(f"[+] Insights uploaded to s3") 

`;

export const analyzerOutputExample = `{
  "event_counts": {"AssumeRole": 150, "GetObject": 89, ...},
  "resource_counts": {"AWS::S3::Object": 45, "AWS::IAM::Role": 12, ...},
  "account_counts": {"AssumedRole": 98, "IAMUser": 52, ...},
  "region_counts": {"us-east-1": 120, "us-west-2": 30, ...},
  "source_ip_counts": {"192.168.1.1": 25, "10.0.0.5": 18, ...},
  "event_type_counts": {"AwsApiCall": 180, "AwsServiceEvent": 20, ...},
  "event_category_counts": {"Management": 150, "Data": 50, ...},
  "total_events": 200
}`;

export const analyzerOutputStructure = `
samuellincoln-log-analyzer-output/
└── AWSLogs/123456789/CloudTrail/us-east-1/2025/07/15/
    ├── 2025-07-15-14:30-insights.json
    └── 2025-07-15-14:30-insights.csv
`;
