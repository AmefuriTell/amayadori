## S1 Scan images for software vulnerabilities in Amazon ECR — Scan images for software vulnerabilities in Amazon ECR
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html#image-scanning
fetched: 2026-11-25
> Amazon ECR image scanning helps to identify software vulnerabilities in your container images.
> Enhanced scanning – Amazon ECR integrates with Amazon Inspector to provide automated, continuous scanning of your repositories.
> Basic scanning – Amazon ECR uses AWS native technology with the Common Vulnerabilities and Exposures (CVEs) database to scan for operating system vulnerabilities.
> With basic scanning, you configure your repositories to scan on push or you can perform manual scans and Amazon ECR provides a list of scan findings.

## S2 Amazon Elastic Container Registry features — Features of Amazon ECR
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#ecr-features
fetched: 2026-11-25
> Lifecycle policies help with managing the lifecycle of the images in your repositories.
> You define rules that result in the cleaning up of unused images.
> Image scanning helps in identifying software vulnerabilities in your container images.
> Each repository can be configured to scan on push.
> Cross-Region and cross-account replication makes it easier for you to have your images where you need them.
> This is configured as a registry setting and is on a per-Region basis.

## S3 Private registry settings in Amazon ECR — Private registry settings in Amazon ECR
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry-settings.html#registry-settings
fetched: 2026-11-25
> The private registry settings are configured separately for each Region.
> The replication configuration controls whether Amazon ECR copies your repositories across AWS Regions or AWS accounts, and whether Amazon ECR replicates image deletions and image tag removals when you enable replication of deletes.

## S4 Automate the cleanup of images by using lifecycle policies in Amazon ECR — How lifecycle policies work
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html#lifecycle-policy-howitworks
fetched: 2026-11-25
> A lifecycle policy consists of one or more rules that determine which images in a repository should be expired.
> A lower rule priority number means higher priority.
> Once a lifecycle policy is applied to a repository, you should expect that images become expired within 24 hours after they meet the expiration criteria.

## S5 What is AWS CodeArtifact? — How does CodeArtifact work?
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#codeartifact-how-does-it-work
fetched: 2026-11-25
> CodeArtifact stores software packages in repositories.
> Every CodeArtifact repository is a member of a single CodeArtifact domain.
> You can also import open-source packages into a repository by configuring it with an external connection to a public repository such as npmjs, NuGet Gallery, Maven Central, or PyPI.
> You can make packages in one repository available to another repository in the same domain.
> To do this, configure one repository as an upstream of the other.
> Packages in CodeArtifact repositories cannot be made publicly available.
