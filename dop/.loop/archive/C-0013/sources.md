## S1 What is Image Builder? — Features of Image Builder
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-features
fetched: 2026-11-26
> Image Builder reduces the amount of work involved in creating and managing images at scale by automating your build pipelines. You can automate your builds by providing your build execution schedule preference. Image Builder provides access to test components that you can use to test your images before deployment. Image Builder distributes your image only if all of the configured tests have succeeded.

## S2 What is Image Builder? — What is Image Builder?
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#what-is-image-builder
fetched: 2026-11-26
> EC2 Image Builder is a fully managed AWS service that helps you to automate the creation, management, and deployment of customized, secure, and up-to-date server images. You can use the AWS Management Console, AWS Command Line Interface, or APIs to create custom images in your AWS account. You own the customized images that Image Builder creates in your account. You can configure pipelines to automate updates and system patching for the images that you own.

## S3 What is Image Builder? — Concepts (Image pipeline, Image recipe, Container recipe, Components)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
fetched: 2026-11-26
> An image pipeline provides an automation framework for building secure AMIs and container images on AWS. The Image Builder image pipeline is associated with an image recipe or container recipe that defines the build, validation, and test phases for an image build lifecycle. An image pipeline can be associated with an infrastructure configuration that defines where your image is built. You can define attributes, such as instance type, subnets, security groups, logging, and other infrastructure-related configurations. You can also associate your image pipeline with a distribution configuration to define how you would like to deploy your image.
> An Image Builder container recipe is a document that defines the base image and the components that are applied to the base image to produce the desired configuration for the output container image. A component defines the sequence of steps required to either customize an instance prior to image creation (a build component), or to test an instance that was launched from the created image (a test component). A component is created from a declarative, plain-text YAML or JSON document that describes the runtime configuration for building and validating, or testing an instance that is produced by your pipeline.

## S4 How EC2 Image Builder works — Pipeline steps, recipe, infrastructure, distribution
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html#how-image-builder-works
fetched: 2026-11-26
> Specify pipeline details – Enter information about your pipeline, such as a name, description, tags, and a schedule to run automated builds. You can choose manual builds, if you prefer.
> Choose recipe – Choose between building an AMI, or building a container image. Container recipes additionally define Dockerfiles, and the target Amazon ECR repository for your output Docker container image.
> Define infrastructure configuration – Image Builder launches EC2 instances in your account to customize images and run validation tests. The Infrastructure configuration settings specify infrastructure details for the instances that will run in your AWS account during the build process.
> Define distribution settings – Choose the AWS Regions to distribute your image to after the build is complete and has passed all its tests. The pipeline automatically distributes your image to the Region where it runs the build, and you can add image distribution for other Regions.
> The images that you build from your custom base image are in your AWS account. You can configure your image pipeline to produce updated and patched versions of your image by entering a build schedule.

## S5 How EC2 Image Builder works — Image testing
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html#ibhow-testing
fetched: 2026-11-26
> You can use AWSTOE test components to validate your image, and ensure that it functions as expected, prior to creating the final image. Generally, each test component consists of a YAML document that contains a test script, a test binary, and test metadata. The test script contains the orchestration commands to start the test binary, which can be written in any language supported by the OS. Exit status codes indicate the test outcome.

## S6 How EC2 Image Builder works — Distribution
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/how-image-builder-works.html#image-builder-distribution
fetched: 2026-11-26
> EC2 Image Builder can distribute AMIs or container images to any AWS Region. The image is copied to each Region that you specify in the account used to build the image. For AMI output images, you can define AMI launch permissions to control which AWS accounts are permitted to launch EC2 instances with the created AMI. You can also use your AWS Organizations account to enforce limitations on member accounts to launch instances only with approved and compliant AMIs.

## S7 How distribution settings work — Distribution configuration (one Region, updates, saved images)
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/distribution-settings-concepts.html#distribution-settings-concepts
fetched: 2026-11-26
> A distribution configuration contains a list of distributions. Each distribution applies to exactly one target Region and defines the outputs for that Region. A Region can appear in a distribution configuration at most once. The available outputs are AMI distribution, container distribution, AWS License Manager configurations, Amazon S3 VM export, launch template configurations, EC2 Fast Launch configurations, and SSM parameter configurations.
> When you update a distribution configuration, the changes apply only to images that Image Builder creates after the update. Images that Image Builder already distributed remain in place until you remove them, either manually or with an Image Builder lifecycle policy.

## S8 Configure AMI distribution with an EC2 launch template — Launch template configuration
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/dist-using-launch-template.html#dist-using-launch-template
fetched: 2026-11-26
> To help ensure a consistent launch experience for your Image Builder AMI in target accounts and Regions, you can specify an Amazon EC2 launch template in your distribution settings, using launchTemplateConfigurations. When launchTemplateConfigurations are present during the distribution process, Image Builder creates a new version of the launch template that includes all of the original settings from the template, and the new AMI ID from the build.
> setDefaultVersion controls whether Image Builder makes the new launch template version the default version. This optional field defaults to true. To create the new version without changing the launch template's default version, set this field to false.
> Use accountId to update a launch template that another account owns. If you omit it, Image Builder updates the launch template in your account. Image Builder rejects the distribution configuration unless the account is listed in targetAccountIds or in the userIds of launchPermission for that Region, or the AMI is public.

## S9 Manage security findings for Image Builder images — Vulnerability scans
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-security-findings.html#image-security-findings
fetched: 2026-11-26
> Image Builder integrates with Amazon Inspector to scan the images that you build for software vulnerabilities. Amazon Inspector is a paid service. An AMI image or AMI pipeline uses one scan type, and you can't combine the two AMI scan types.
> Amazon Inspector scans the test instance that Image Builder launches during the test stage, and Image Builder saves a copy of the findings with your image. Amazon Inspector scans the output AMI that the build creates. We recommend that you use this scan type for AMI images. You can set a scan result condition that fails the image if the AMI has findings that are more severe than you allow.
> When Amazon Inspector discovers vulnerabilities in your software, it takes the following actions: Sends an event to Amazon EventBridge for each finding.

## S10 How lifecycle management rules work for Image Builder image resources — Rule types and order
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/image-lifecycle-rules.html#image-lifecycle-rules
fetched: 2026-11-26
> Lifecycle rules keep your images fresh and reduce infrastructure costs, such as snapshot storage for output AMIs and Amazon ECR repository storage for containers. Sets the Image Builder image resource status to Deprecated. Image Builder pipelines still run for deprecated images.
> Deletes the image resources by age or by count. You define the threshold that meets your needs. When an Image Builder image resource passes the threshold, it's removed.
> Only one action applies to each resource per execution. If a resource matches a deprecate rule, Image Builder deprecates it and skips the disable and delete rules for that resource during the same run. For example, you can configure a policy to deprecate images after 90 days, disable them after 120 days, and delete them after 180 days. Each execution applies only the highest-priority matching action.
