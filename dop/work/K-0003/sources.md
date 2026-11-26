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

### 覆えなかった行
- 技能 1 の「Amazon S3」の部分（artifact repositories の S3 の設定）: S3 のページを取っていない。
- 技能 2 の「AWS Lambda」の部分（Lambda で artifact を作るビルドツール）: Lambda のページを取っていない。CodeBuild は npm の login（S6）だけ覆った。CodeBuild の buildspec・成果物の出力は未取得。
