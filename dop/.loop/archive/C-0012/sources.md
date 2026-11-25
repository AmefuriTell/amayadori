# 出典: C-0012 Configuring build tools for generating artifacts (for example, CodeBuild, AWS Lambda)

## S1 Build specification reference for CodeBuild — artifacts/files
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts
fetched: 2026-11-25
> Required sequence. Represents the locations that contain the build output artifacts in the build environment. Contains a sequence of scalars, with each scalar representing a separate location where CodeBuild can find build output artifacts, relative to the original build location or, if set, the base directory.
> '**/*' represents all files recursively.
> my-subdirectory/**/* represents all files recursively starting from a subdirectory named my-subdirectory.

## S2 Build specification reference for CodeBuild — artifacts/base-directory と discard-paths
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts
fetched: 2026-11-25
> artifacts/discard-paths Optional. Specifies if the build artifact directories are flattened in the output. If this is not specified, or contains no, build artifacts are output with their directory structure intact. If this contains yes, all of the build artifacts are placed in the same output directory.
> artifacts/base-directory Optional mapping. Represents one or more top-level directories, relative to the original build location, that CodeBuild uses to determine which files and subdirectories to include in the build output artifact.
> Matching top-level directories are not included in the build output artifact, only their files and subdirectories.

## S3 Build specification reference for CodeBuild — env/parameter-store と env/secrets-manager
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env
fetched: 2026-11-25
> We strongly discourage the storing of sensitive values in environment variables. Environment variables can be displayed in plain text using tools such as the CodeBuild console and the AWS CLI. For sensitive values, we recommend that you use parameter-store or secrets-manager mapping instead, as described later in this section.
> To allow CodeBuild to retrieve custom environment variables stored in Amazon EC2 Systems Manager Parameter Store, you must add the ssm:GetParameters action to your CodeBuild service role.
> Required if you want to retrieve custom environment variables stored in AWS Secrets Manager. Specify a Secrets Manager reference-key using the following pattern:
> <key>: <secret-id>:<json-key>:<version-stage>:<version-id>
> <secret-id> (Required) The name or Amazon Resource Name (ARN) that serves as a unique identifier for the secret.
> <json-key> (Optional) Specifies the key name of the Secrets Manager key-value pair whose value you want to retrieve. If you do not specify a json-key, CodeBuild retrieves the entire secret text.

## S4 Cache builds to improve performance — Local caching
url: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html#caching-local
fetched: 2026-11-25
> Local caching stores a cache locally on a build host that is available to that build host only.
> If you choose local caching, you must choose one or more of the following cache modes:
> Source cache mode caches Git metadata for primary and secondary sources.
> Docker layer cache mode caches existing Docker layers.

## S5 Use AWS CodeBuild with Amazon Virtual Private Cloud — 概要と NAT
url: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html#vpc-support
fetched: 2026-11-25
> Typically, AWS CodeBuild cannot access resources in a VPC. To enable access, you must provide additional VPC-specific configuration information in your CodeBuild project configuration. This includes the VPC ID, the VPC subnet IDs, and the VPC security group IDs. VPC-enabled builds can then access resources inside your VPC.
> You need a NAT gateway or NAT instance to use CodeBuild with your VPC so that CodeBuild can reach public endpoints (for example, to run CLI commands when running builds).

## S6 Deploying Lambda Event Functions as .zip file archives — デプロイパッケージの種類
url: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#configuration-function-zip
fetched: 2026-11-25
> When you create a Lambda Event Function, you package your function code into a deployment package. Lambda supports two types of deployment packages: container images and .zip file archives.
> You cannot change the deployment package type (.zip or container image) for an existing function. For example, you cannot convert a container image function to use a .zip file archive. You must create a new function.
> By default, when you upload a .zip file, Lambda stores a copy of your source code in Lambda-managed storage.

## S7 Packaging your layer content — レイヤーの中身（.zip）
url: https://docs.aws.amazon.com/lambda/latest/dg/packaging-layers.html#packaging-layers
fetched: 2026-11-25
> A Lambda layer is a .zip file archive that contains supplementary code or data.
> Layers usually contain library dependencies, a custom runtime, or configuration files.
> The first step to creating a layer is to bundle all of your layer content into a .zip file archive.
