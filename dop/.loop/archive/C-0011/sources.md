# C-0011 sources（1.3 Creating and configuring artifact repositories）

## S1 AWS CodeArtifact concepts — Domain
url: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-domain
fetched: 2026-11-25
> Repositories are aggregated into a higher-level entity known as a domain.
> All of the assets and metadata in a domain are encrypted with the same AWS KMS key (KMS key) stored in AWS Key Management Service (AWS KMS).
> Each repository is a member of a single domain and can't be moved to a different domain.
> Using a domain, you can apply an organizational policy across multiple repositories.
> With this approach, you determine which accounts can access repositories in the domain, and which public repositories can be used as the sources of packages.
> Although an organization can have multiple domains, we recommend a single production domain that contains all published artifacts.

## S2 What is AWS CodeArtifact? — How does CodeArtifact work?
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#codeartifact-how-does-it-work
fetched: 2026-11-25
> Every CodeArtifact repository is a member of a single CodeArtifact domain.
> CodeArtifact requires users to authenticate with the service in order to publish or consume package versions.
> You must authenticate to the CodeArtifact service by creating an authorization token using your AWS credentials.
> Packages in CodeArtifact repositories cannot be made publicly available.

## S3 What is Amazon Elastic Container Registry? — Features of Amazon ECR
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#ecr-features
fetched: 2026-11-25
> Amazon ECR supports private repositories with resource-based permissions using AWS IAM.
> Cross-Region and cross-account replication makes it easier for you to have your images where you need them.
> You can specify tag immutability, encryption configuration, repository policies, lifecycle policies, and resource tags for automatically created repositories.

## S4 Automate the cleanup of images by using lifecycle policies in Amazon ECR — Lifecycle policy evaluation rules
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

## S5 AWS CodePipeline concepts — Artifacts
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-artifacts
fetched: 2026-11-25
> Artifacts refers to the collection of data, such as application source code, built applications, dependencies, definitions files, templates, and so on, that is worked on by pipeline actions.
> Actions pass output to another action for further processing using the pipeline artifact bucket.
> CodePipeline copies artifacts to the artifact store, where the action picks them up.

## S6 Input and output artifacts — AWS CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html#welcome-introducing-artifacts
fetched: 2026-11-25
> The artifact bucket is not the same bucket as the bucket used as the source file location for a pipeline where the chosen source action is S3.
> When you create or edit a pipeline, you must have an artifact bucket in the pipeline AWS account and AWS Region, and you must have one artifact bucket per Region where you plan to execute an action.
> If you use the console to create a pipeline or cross-region actions, default artifact buckets are configured by CodePipeline in the Regions where you have actions.
> If you use the AWS CLI to create or edit a pipeline, and you add a cross-region action (an action with an AWS provider in a Region different from your pipeline), you must provide an artifact bucket for each additional Region where you plan to execute an action.

## S7 Automate the cleanup of images by using lifecycle policies in Amazon ECR — Lifecycle policy evaluation rules（imageCountMoreThan）
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lp_evaluation_rules
fetched: 2026-11-25
> With countType = imageCountMoreThan, images are sorted from youngest to oldest based on pushed_at_time and then all images greater than the specified count are expired or archived.
