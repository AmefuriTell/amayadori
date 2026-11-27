## S1 AWS CodeArtifact — What is AWS CodeArtifact? (#welcome)
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#welcome
fetched: 2026-11-26
> AWS CodeArtifact is a secure, highly scalable, managed artifact repository service that helps organizations to store and share software packages for application development. You can also publish private packages to a CodeArtifact repository. This helps you share proprietary software components between multiple applications and development teams in your organization.

## S2 AWS CodeArtifact — How does CodeArtifact work? (#codeartifact-how-does-it-work)
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#codeartifact-how-does-it-work
fetched: 2026-11-26
> You can also import open-source packages into a repository by configuring it with an external connection to a public repository such as npmjs, NuGet Gallery, Maven Central, or PyPI. CodeArtifact requires users to authenticate with the service in order to publish or consume package versions. You must authenticate to the CodeArtifact service by creating an authorization token using your AWS credentials. Packages in CodeArtifact repositories cannot be made publicly available.

## S3 AWS CodeArtifact concepts — Domain (#welcome-concepts-domain)
url: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-domain
fetched: 2026-11-26
> All of the assets and metadata in a domain are encrypted with the same AWS KMS key (KMS key) stored in AWS Key Management Service (AWS KMS). Using a domain, you can apply an organizational policy across multiple repositories.

## S4 AWS CodeArtifact concepts — Package version revision (#welcome-concepts-package-version-revision)
url: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-package-version-revision
fetched: 2026-11-26
> A package version revision is a string that identifies a specific set of assets and metadata for a package version. Each time a package version is updated, a new package version revision is created.

## S5 AWS CodeArtifact concepts — Package group (#welcome-concepts-package-group)
url: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-package-group
fetched: 2026-11-26
> Package origin controls are used to block or allow ingestion or publishing of new package versions, which protects users from malicious actions known as dependency substitution attacks.

## S6 Using npm packages in CodeBuild — Log in and use npm (#npm-packages-in-codebuild-login)
url: https://docs.aws.amazon.com/codeartifact/latest/ug/using-npm-packages-in-codebuild.html#npm-packages-in-codebuild-login
fetched: 2026-11-26
> To use npm packages from CodeBuild, run the login command from the pre-build section of your project's buildspec.yaml to configure npm to fetch packages from CodeArtifact. After login has run successfully, you can run npm commands from the build section to install npm packages.

## S7 Amazon ECR — Features of Amazon ECR (#ecr-features)
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#ecr-features
fetched: 2026-11-26
> Lifecycle policies help with managing the lifecycle of the images in your repositories. You define rules that result in the cleaning up of unused images. Image scanning helps in identifying software vulnerabilities in your container images. Repository creation templates allow you to define the settings for repositories created by Amazon ECR on your behalf during pull through cache, create on push, or replication actions. You can specify tag immutability, encryption configuration, repository policies, lifecycle policies, and resource tags for automatically created repositories.

## S8 Amazon ECR — Automate the cleanup of images by using lifecycle policies (#lifecycle-policy-howitworks)
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lifecycle-policy-howitworks
fetched: 2026-11-26
> A lifecycle policy consists of one or more rules that determine which images in a repository should be expired. Once a lifecycle policy is applied to a repository, you should expect that images become expired within 24 hours after they meet the expiration criteria. A lower rule priority number means higher priority.

## S9 EC2 Image Builder — What is Image Builder? (#image-builder-concepts)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#what-is-image-builder
fetched: 2026-11-26
> An image pipeline provides an automation framework for building secure AMIs and container images on AWS. The Image Builder image pipeline is associated with an image recipe or container recipe that defines the build, validation, and test phases for an image build lifecycle. An image pipeline can be associated with an infrastructure configuration that defines where your image is built.

## S10 EC2 Image Builder — Image recipe and Components (#image-builder-concepts)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
fetched: 2026-11-26
> An Image Builder image recipe is a document that defines the base image and the components that are applied to the base image to produce the desired configuration for the output AMI image. A component defines the sequence of steps required to either customize an instance prior to image creation (a build component), or to test an instance that was launched from the created image (a test component).

## S11 EC2 Image Builder — Integrate products and services in Image Builder (#integrate-products-services)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/integrate-products-services.html#integrate-products-services
fetched: 2026-11-26
> Components that you specify in your recipes can perform build and test actions, for example, to install software or perform compliance validation. Container images that you create with Image Builder are stored in Amazon ECR in your source Region (where your build runs), and in any Regions where you distribute the container image.

## S12 EC2 Image Builder — How lifecycle management rules work for Image Builder image resources (#image-lifecycle-rules)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-lifecycle-rules.html#image-lifecycle-rules
fetched: 2026-11-26
> Lifecycle rules keep your images fresh and reduce infrastructure costs, such as snapshot storage for output AMIs and Amazon ECR repository storage for containers. Deletes the image resources by age or by count.

## S13 EC2 Image Builder — Rule priority and evaluation order (#image-lifecycle-rule-priority)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-lifecycle-rules.html#image-lifecycle-rule-priority
fetched: 2026-11-26
> When a policy has multiple rule types, Image Builder evaluates each resource in this order: Deprecate rule, Disable rule, Delete rule. Only one action applies to each resource per execution.

## S14 EC2 Image Builder — How retention is calculated (#image-lifecycle-rules-retention)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-lifecycle-rules.html#image-lifecycle-rules-retention
fetched: 2026-11-26
> The AGE filter uses the Image Builder image resource creation date (set once the build completes), not the output AMI or container creation date. The COUNT filter counts Image Builder image resources per recipe version, not output AMIs or containers.

## S15 EC2 Image Builder — Share Image Builder resources with AWS RAM (#share-ib-resources-prereqs)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-shared-resources.html#share-ib-resources-prereqs
fetched: 2026-11-26
> Your AWS account must own the Image Builder resource that you want to share. You cannot share resources that have been shared with you. The AWS Key Management Service (AWS KMS) key associated with encrypted resources must be explicitly shared with the target accounts, organizations, or OUs.

## S16 AWS CodeArtifact concepts — Domain
url: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-domain
fetched: 2026-11-25
> Repositories are aggregated into a higher-level entity known as a domain.
> All of the assets and metadata in a domain are encrypted with the same AWS KMS key (KMS key) stored in AWS Key Management Service (AWS KMS).
> Each repository is a member of a single domain and can't be moved to a different domain.
> Using a domain, you can apply an organizational policy across multiple repositories.
> With this approach, you determine which accounts can access repositories in the domain, and which public repositories can be used as the sources of packages.
> Although an organization can have multiple domains, we recommend a single production domain that contains all published artifacts.

## S17 What is AWS CodeArtifact? — How does CodeArtifact work?
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#codeartifact-how-does-it-work
fetched: 2026-11-25
> Every CodeArtifact repository is a member of a single CodeArtifact domain.
> CodeArtifact requires users to authenticate with the service in order to publish or consume package versions.
> You must authenticate to the CodeArtifact service by creating an authorization token using your AWS credentials.
> Packages in CodeArtifact repositories cannot be made publicly available.

## S18 What is Amazon Elastic Container Registry? — Features of Amazon ECR
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#ecr-features
fetched: 2026-11-25
> Amazon ECR supports private repositories with resource-based permissions using AWS IAM.
> Cross-Region and cross-account replication makes it easier for you to have your images where you need them.
> You can specify tag immutability, encryption configuration, repository policies, lifecycle policies, and resource tags for automatically created repositories.

## S19 Automate the cleanup of images by using lifecycle policies in Amazon ECR — Lifecycle policy evaluation rules
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
fetched: 2026-11-25
> All rules are evaluated at the same time, regardless of rule priority.
> An image is expired or archived by exactly one or zero rules.
> An image that matches the tagging requirements of a rule cannot be expired or archived by a rule with a lower priority.
> Rules can never mark images that are marked by higher priority rules, but can still identify them as if they haven't been expired or archived.
> Only one rule selecting a specific storage class is allowed to select untagged images.
> A lifecycle policy rule may specify either tagPatternList or tagPrefixList, but not both.
> The tagPatternList or tagPrefixList parameters may only used if the tagStatus is tagged.
> With countType = sinceImagePushed, all images whose pushed_at_time is older than the specified number of days based on countNumber are expired or archived.

## S20 AWS CodePipeline concepts — Artifacts
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-artifacts
fetched: 2026-11-25
> Artifacts refers to the collection of data, such as application source code, built applications, dependencies, definitions files, templates, and so on, that is worked on by pipeline actions.
> Actions pass output to another action for further processing using the pipeline artifact bucket.
> CodePipeline copies artifacts to the artifact store, where the action picks them up.

## S21 Input and output artifacts — AWS CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html#welcome-introducing-artifacts
fetched: 2026-11-25
> The artifact bucket is not the same bucket as the bucket used as the source file location for a pipeline where the chosen source action is S3.
> When you create or edit a pipeline, you must have an artifact bucket in the pipeline AWS account and AWS Region, and you must have one artifact bucket per Region where you plan to execute an action.
> If you use the console to create a pipeline or cross-region actions, default artifact buckets are configured by CodePipeline in the Regions where you have actions.
> If you use the AWS CLI to create or edit a pipeline, and you add a cross-region action (an action with an AWS provider in a Region different from your pipeline), you must provide an artifact bucket for each additional Region where you plan to execute an action.

## S22 Automate the cleanup of images by using lifecycle policies in Amazon ECR — Lifecycle policy evaluation rules（imageCountMoreThan）
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
fetched: 2026-11-25
> With countType = imageCountMoreThan, images are sorted from youngest to oldest based on pushed_at_time and then all images greater than the specified count are expired or archived.

## S23 Build specification reference for CodeBuild — artifacts/files
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts
fetched: 2026-11-25
> Required sequence. Represents the locations that contain the build output artifacts in the build environment. Contains a sequence of scalars, with each scalar representing a separate location where CodeBuild can find build output artifacts, relative to the original build location or, if set, the base directory.
> '**/*' represents all files recursively.
> my-subdirectory/**/* represents all files recursively starting from a subdirectory named my-subdirectory.

## S24 Build specification reference for CodeBuild — artifacts/base-directory と discard-paths
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts
fetched: 2026-11-25
> artifacts/discard-paths Optional. Specifies if the build artifact directories are flattened in the output. If this is not specified, or contains no, build artifacts are output with their directory structure intact. If this contains yes, all of the build artifacts are placed in the same output directory.
> artifacts/base-directory Optional mapping. Represents one or more top-level directories, relative to the original build location, that CodeBuild uses to determine which files and subdirectories to include in the build output artifact.
> Matching top-level directories are not included in the build output artifact, only their files and subdirectories.

## S25 Build specification reference for CodeBuild — env/parameter-store と env/secrets-manager
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env
fetched: 2026-11-25
> We strongly discourage the storing of sensitive values in environment variables. Environment variables can be displayed in plain text using tools such as the CodeBuild console and the AWS CLI. For sensitive values, we recommend that you use parameter-store or secrets-manager mapping instead, as described later in this section.
> To allow CodeBuild to retrieve custom environment variables stored in Amazon EC2 Systems Manager Parameter Store, you must add the ssm:GetParameters action to your CodeBuild service role.
> Required if you want to retrieve custom environment variables stored in AWS Secrets Manager. Specify a Secrets Manager reference-key using the following pattern:
> <key>: <secret-id>:<json-key>:<version-stage>:<version-id>
> <secret-id> (Required) The name or Amazon Resource Name (ARN) that serves as a unique identifier for the secret.
> <json-key> (Optional) Specifies the key name of the Secrets Manager key-value pair whose value you want to retrieve. If you do not specify a json-key, CodeBuild retrieves the entire secret text.

## S26 Cache builds to improve performance — Local caching
url: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html#caching-local
fetched: 2026-11-25
> Local caching stores a cache locally on a build host that is available to that build host only.
> If you choose local caching, you must choose one or more of the following cache modes:
> Source cache mode caches Git metadata for primary and secondary sources.
> Docker layer cache mode caches existing Docker layers.

## S27 Use AWS CodeBuild with Amazon Virtual Private Cloud — 概要と NAT
url: https://docs.aws.amazon.com/codebuild/latest/userguide/vpc-support.html#vpc-support
fetched: 2026-11-25
> Typically, AWS CodeBuild cannot access resources in a VPC. To enable access, you must provide additional VPC-specific configuration information in your CodeBuild project configuration. This includes the VPC ID, the VPC subnet IDs, and the VPC security group IDs. VPC-enabled builds can then access resources inside your VPC.
> You need a NAT gateway or NAT instance to use CodeBuild with your VPC so that CodeBuild can reach public endpoints (for example, to run CLI commands when running builds).

## S28 Deploying Lambda Event Functions as .zip file archives — デプロイパッケージの種類
url: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#configuration-function-zip
fetched: 2026-11-25
> When you create a Lambda Event Function, you package your function code into a deployment package. Lambda supports two types of deployment packages: container images and .zip file archives.
> You cannot change the deployment package type (.zip or container image) for an existing function. For example, you cannot convert a container image function to use a .zip file archive. You must create a new function.
> By default, when you upload a .zip file, Lambda stores a copy of your source code in Lambda-managed storage.

## S29 Packaging your layer content — レイヤーの中身（.zip）
url: https://docs.aws.amazon.com/lambda/latest/dg/packaging-layers.html#packaging-layers
fetched: 2026-11-25
> A Lambda layer is a .zip file archive that contains supplementary code or data.
> Layers usually contain library dependencies, a custom runtime, or configuration files.
> The first step to creating a layer is to bundle all of your layer content into a .zip file archive.

## S30 What is Image Builder? — Features of Image Builder
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-features
fetched: 2026-11-26
> Image Builder reduces the amount of work involved in creating and managing images at scale by automating your build pipelines. You can automate your builds by providing your build execution schedule preference. Image Builder provides access to test components that you can use to test your images before deployment. Image Builder distributes your image only if all of the configured tests have succeeded.

## S31 What is Image Builder? — What is Image Builder?
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#what-is-image-builder
fetched: 2026-11-26
> EC2 Image Builder is a fully managed AWS service that helps you to automate the creation, management, and deployment of customized, secure, and up-to-date server images. You can use the AWS Management Console, AWS Command Line Interface, or APIs to create custom images in your AWS account. You own the customized images that Image Builder creates in your account. You can configure pipelines to automate updates and system patching for the images that you own.

## S32 What is Image Builder? — Concepts (Image pipeline, Image recipe, Container recipe, Components)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
fetched: 2026-11-26
> An image pipeline provides an automation framework for building secure AMIs and container images on AWS. The Image Builder image pipeline is associated with an image recipe or container recipe that defines the build, validation, and test phases for an image build lifecycle. An image pipeline can be associated with an infrastructure configuration that defines where your image is built. You can define attributes, such as instance type, subnets, security groups, logging, and other infrastructure-related configurations. You can also associate your image pipeline with a distribution configuration to define how you would like to deploy your image.
> An Image Builder container recipe is a document that defines the base image and the components that are applied to the base image to produce the desired configuration for the output container image. A component defines the sequence of steps required to either customize an instance prior to image creation (a build component), or to test an instance that was launched from the created image (a test component). A component is created from a declarative, plain-text YAML or JSON document that describes the runtime configuration for building and validating, or testing an instance that is produced by your pipeline.

## S33 How EC2 Image Builder works — Pipeline steps, recipe, infrastructure, distribution
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html#how-image-builder-works
fetched: 2026-11-26
> Specify pipeline details – Enter information about your pipeline, such as a name, description, tags, and a schedule to run automated builds. You can choose manual builds, if you prefer.
> Choose recipe – Choose between building an AMI, or building a container image. Container recipes additionally define Dockerfiles, and the target Amazon ECR repository for your output Docker container image.
> Define infrastructure configuration – Image Builder launches EC2 instances in your account to customize images and run validation tests. The Infrastructure configuration settings specify infrastructure details for the instances that will run in your AWS account during the build process.
> Define distribution settings – Choose the AWS Regions to distribute your image to after the build is complete and has passed all its tests. The pipeline automatically distributes your image to the Region where it runs the build, and you can add image distribution for other Regions.
> The images that you build from your custom base image are in your AWS account. You can configure your image pipeline to produce updated and patched versions of your image by entering a build schedule.

## S34 How EC2 Image Builder works — Image testing
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html#ibhow-testing
fetched: 2026-11-26
> You can use AWSTOE test components to validate your image, and ensure that it functions as expected, prior to creating the final image. Generally, each test component consists of a YAML document that contains a test script, a test binary, and test metadata. The test script contains the orchestration commands to start the test binary, which can be written in any language supported by the OS. Exit status codes indicate the test outcome.

## S35 How EC2 Image Builder works — Distribution
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html#image-builder-distribution
fetched: 2026-11-26
> EC2 Image Builder can distribute AMIs or container images to any AWS Region. The image is copied to each Region that you specify in the account used to build the image. For AMI output images, you can define AMI launch permissions to control which AWS accounts are permitted to launch EC2 instances with the created AMI. You can also use your AWS Organizations account to enforce limitations on member accounts to launch instances only with approved and compliant AMIs.

## S36 How distribution settings work — Distribution configuration (one Region, updates, saved images)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/distribution-settings-concepts.html#distribution-settings-concepts
fetched: 2026-11-26
> A distribution configuration contains a list of distributions. Each distribution applies to exactly one target Region and defines the outputs for that Region. A Region can appear in a distribution configuration at most once. The available outputs are AMI distribution, container distribution, AWS License Manager configurations, Amazon S3 VM export, launch template configurations, EC2 Fast Launch configurations, and SSM parameter configurations.
> When you update a distribution configuration, the changes apply only to images that Image Builder creates after the update. Images that Image Builder already distributed remain in place until you remove them, either manually or with an Image Builder lifecycle policy.

## S37 Configure AMI distribution with an EC2 launch template — Launch template configuration
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/dist-using-launch-template.html#dist-using-launch-template
fetched: 2026-11-26
> To help ensure a consistent launch experience for your Image Builder AMI in target accounts and Regions, you can specify an Amazon EC2 launch template in your distribution settings, using launchTemplateConfigurations. When launchTemplateConfigurations are present during the distribution process, Image Builder creates a new version of the launch template that includes all of the original settings from the template, and the new AMI ID from the build.
> setDefaultVersion controls whether Image Builder makes the new launch template version the default version. This optional field defaults to true. To create the new version without changing the launch template's default version, set this field to false.
> Use accountId to update a launch template that another account owns. If you omit it, Image Builder updates the launch template in your account. Image Builder rejects the distribution configuration unless the account is listed in targetAccountIds or in the userIds of launchPermission for that Region, or the AMI is public.

## S38 Manage security findings for Image Builder images — Vulnerability scans
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-security-findings.html#image-security-findings
fetched: 2026-11-26
> Image Builder integrates with Amazon Inspector to scan the images that you build for software vulnerabilities. Amazon Inspector is a paid service. An AMI image or AMI pipeline uses one scan type, and you can't combine the two AMI scan types.
> Amazon Inspector scans the test instance that Image Builder launches during the test stage, and Image Builder saves a copy of the findings with your image. Amazon Inspector scans the output AMI that the build creates. We recommend that you use this scan type for AMI images. You can set a scan result condition that fails the image if the AMI has findings that are more severe than you allow.
> When Amazon Inspector discovers vulnerabilities in your software, it takes the following actions: Sends an event to Amazon EventBridge for each finding.

## S39 How lifecycle management rules work for Image Builder image resources — Rule types and order
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-lifecycle-rules.html#image-lifecycle-rules
fetched: 2026-11-26
> Lifecycle rules keep your images fresh and reduce infrastructure costs, such as snapshot storage for output AMIs and Amazon ECR repository storage for containers. Sets the Image Builder image resource status to Deprecated. Image Builder pipelines still run for deprecated images.
> Deletes the image resources by age or by count. You define the threshold that meets your needs. When an Image Builder image resource passes the threshold, it's removed.
> Only one action applies to each resource per execution. If a resource matches a deprecate rule, Image Builder deprecates it and skips the disable and delete rules for that resource during the same run. For example, you can configure a policy to deprecate images after 90 days, disable them after 120 days, and delete them after 180 days. Each execution applies only the highest-priority matching action.

### 覆えなかった行
- 技能 1 の「Amazon S3」の部分（artifact repositories の S3 の設定）: S3 のページを取っていない。
- 技能 2 の「AWS Lambda」の部分（Lambda で artifact を作るビルドツール）: Lambda のページを取っていない。CodeBuild は npm の login（S6）だけ覆った。CodeBuild の buildspec・成果物の出力は未取得。
