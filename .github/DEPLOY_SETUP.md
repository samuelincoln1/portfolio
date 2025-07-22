# Configuração do Deploy Automático

Este projeto está configurado para deploy automático usando GitHub Actions. Para que funcione corretamente, você precisa configurar os seguintes secrets no seu repositório GitHub.

## Secrets Necessários

Vá em **Settings > Secrets and variables > Actions** no seu repositório GitHub e adicione os seguintes secrets:

### AWS Credentials
- `AWS_ACCESS_KEY_ID`: Sua AWS Access Key ID
- `AWS_SECRET_ACCESS_KEY`: Sua AWS Secret Access Key  
- `AWS_REGION`: Região AWS onde seus recursos estão (ex: `us-east-1`)

### S3 e CloudFront
- `S3_BUCKET_NAME`: Nome do bucket S3 (ex: `meu-portfolio-bucket`)
- `CLOUDFRONT_DISTRIBUTION_ID`: ID da distribuição CloudFront (ex: `E1234567890ABC`)

## Como Obter os Valores

### AWS Credentials
1. Acesse o AWS IAM Console
2. Crie um usuário específico para CI/CD (ex: `portfolio-deploy-user`)
3. Crie uma política personalizada usando o arquivo `aws-iam-policy.json` desta pasta:
   - Substitua `SEU_BUCKET_NAME` pelo nome do seu bucket
   - Substitua `SEU_DISTRIBUTION_ID` pelo ID da sua distribuição CloudFront
4. Anexe essa política ao usuário criado
5. Gere Access Keys para esse usuário

### S3 Bucket Name
- Nome do bucket onde você quer hospedar o site

### CloudFront Distribution ID
1. Acesse o CloudFront Console
2. Encontre sua distribuição
3. Copie o ID da distribuição (algo como `E1234567890ABC`)

## Como o Deploy Funciona

O workflow será executado automaticamente quando você:
- Fizer push para as branches `main` ou `master`
- Abrir/atualizar Pull Requests para essas branches

### Etapas do Deploy:
1. ✅ Checkout do código
2. ✅ Setup do Node.js e pnpm
3. ✅ Instalação das dependências (`pnpm install`)
4. ✅ Build do projeto (`pnpm build`)
5. ✅ Upload para S3 (removendo arquivos antigos)
6. ✅ Invalidação do cache do CloudFront

## Testando Localmente

Para testar o build localmente antes do deploy:
```bash
pnpm install
pnpm build
```

Os arquivos serão gerados na pasta `out/` - essa é a pasta que será enviada para o S3.

## Monitorando os Deploys

Você pode acompanhar o progresso dos deploys em:
- **Actions tab** do seu repositório GitHub
- Logs detalhados de cada etapa do processo
- Notificações por email em caso de falha

## Troubleshooting Comum

### "Access Denied" no S3
- Verifique se as credenciais AWS estão corretas
- Confirme se a política IAM foi aplicada corretamente
- Verifique se o nome do bucket está correto

### "Distribution not found" no CloudFront
- Confirme se o `CLOUDFRONT_DISTRIBUTION_ID` está correto
- Verifique se a distribuição existe na mesma região/conta AWS

### Build falha
- Execute `pnpm build` localmente para identificar erros
- Verifique se todas as dependências estão no `package.json`
- Confirme se não há erros de TypeScript/ESLint

## Próximos Passos Opcionais

### Branch Protection
Considere configurar branch protection rules para:
- Exigir que o build passe antes do merge
- Exigir reviews antes do merge para a branch principal

### Ambientes
Você pode criar workflows separados para:
- **Staging**: Deploy automático de PRs para ambiente de teste
- **Production**: Deploy manual ou automático apenas da branch main 