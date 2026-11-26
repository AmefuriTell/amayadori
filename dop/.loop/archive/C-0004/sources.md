# 資料 C-0004 — Managing build and deployment secrets

## S1 CodeBuild buildspec 参照 — env/parameter-store
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env
fetched: 2026-11-26
> Required if env is specified, and you want to retrieve custom environment variables stored in Amazon EC2 Systems Manager Parameter Store.
> To allow CodeBuild to retrieve custom environment variables stored in Amazon EC2 Systems Manager Parameter Store, you must add the ssm:GetParameters action to your CodeBuild service role.

## S2 CodeBuild buildspec 参照 — env/secrets-manager
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env
fetched: 2026-11-26
> Required if you want to retrieve custom environment variables stored in AWS Secrets Manager.
> (Required) The name or Amazon Resource Name (ARN) that serves as a unique identifier for the secret.
> To access a secret in your AWS account, simply specify the secret name.
> (Optional) Specifies the key name of the Secrets Manager key-value pair whose value you want to retrieve.
> If you do not specify a json-key, CodeBuild retrieves the entire secret text.
> If you don't specify a version stage or version ID, the default is to retrieve the version with the version stage value of AWSCURRENT.
> In the following example, TestSecret is the name of the key-value pair stored in Secrets Manager.
> You access the variable during the build using the LOCAL_SECRET_VAR name.

## S3 CodeBuild buildspec 参照 — env（ログでの隠し方）
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env
fetched: 2026-11-26
> To protect sensitive information, the following are hidden in CodeBuild logs:
> Strings specified using the Parameter Store.
> Strings specified using AWS Secrets Manager.
> Masking matches the exact value stored in Amazon EC2 Systems Manager Parameter Store or AWS Secrets Manager.
> To keep a value masked, store it in the form your build uses.

## S4 CodeBuild 環境変数 — Environment variables in build environments
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html#build-env-ref-env-vars
fetched: 2026-11-26
> We recommend you store sensitive values in the Amazon EC2 Systems Manager Parameter Store and then retrieve them from your buildspec.

## S5 AWS Secrets Manager — Rotate AWS Secrets Manager secrets
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html#rotating-secrets
fetched: 2026-11-26
> Rotation is the process of periodically updating a secret.
> When you rotate a secret, you update the credentials in both the secret and the database or service.
> In Secrets Manager, you can set up automatic rotation for your secrets.
> Managed rotation – For most managed secrets, you use managed rotation, where the service configures and manages rotation for you.
> Managed rotation doesn't use a Lambda function.
> Rotation by Lambda function – For other types of secrets, Secrets Manager rotation uses a Lambda function to update the secret and the database or service.

## S6 AWS Secrets Manager — What is AWS Secrets Manager?
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html#intro
fetched: 2026-11-26
> AWS Secrets Manager helps you manage, retrieve, and rotate database credentials, application credentials, OAuth tokens, API keys, and other secrets throughout their lifecycles.
> Secrets Manager helps you improve your security posture, because you no longer need hard-coded credentials in application source code.
> You replace hard-coded credentials with a runtime call to the Secrets Manager service to retrieve credentials dynamically when you need them.
> With Secrets Manager, you can configure an automatic rotation schedule for your secrets.
> Since the credentials are no longer stored with the application, rotating credentials no longer requires updating your applications and deploying changes to application clients.
> You can use the AWS managed key aws/secretsmanager that Secrets Manager creates to encrypt your secrets for free.

## S7 AWS Systems Manager Parameter Store — AWS Systems Manager Parameter Store
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#systems-manager-parameter-store
fetched: 2026-11-26
> Parameter Store is a centralized configuration data store for named values called parameters.
> Use SecureString for configuration values that require encryption, such as service endpoints and account identifiers.
> For secrets such as database credentials, API keys, or tokens, we recommend AWS Secrets Manager, which provides purpose built security controls including automatic rotation and cross-region replication.
> Parameter Store encrypts the values using AWS Key Management Service.

## S8 AWS Systems Manager Parameter Store — Where should I store my application data?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#parameter-store-use-cases
fetched: 2026-11-26
> If you manage credentials such as usernames, passwords, or any other secrets, we recommend using AWS Secrets Manager.
> Secrets Manager is purpose-built for managing secrets such as database credentials, API keys, and supported third-party software-vended secrets.

## S9 AWS Systems Manager Parameter Store — Parameter Store features
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#parameter-store-features
fetched: 2026-11-26
> AWS CodeBuild lets you define environmental variables whose values are dynamically retrieved from Parameter Store at build time.
> Environment variables from Parameter Store are resolved when a task starts.
> For secrets, use AWS Secrets Manager.
