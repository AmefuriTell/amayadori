# C-0053 資料（4.2 Configuring AWS X-Ray for different services）

## S0 X-Ray SDK and Daemon Support timeline — Maintenance mode
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-daemon-timeline.html
fetched: 2026-11-26
> AWS will limit X-Ray SDK and Daemon releases to address security issues only. The SDKs/Daemon will not receive new feature enhancements. We recommend that you migrate to OpenTelemetry solutions for instrumenting your application and sending traces to AWS X-Ray.

## S1 AWS Lambda and AWS X-Ray — AWS Lambda and AWS X-Ray
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html#xray-services-lambda
fetched: 2026-11-26
> You can use AWS X-Ray to trace your AWS Lambda functions. If your Lambda function is called by another instrumented service, Lambda traces requests that have already been sampled without any additional configuration. If your Lambda function runs on a schedule, or is invoked by a service that is not instrumented, you can configure Lambda to sample and record invocations with active tracing. Under AWS X-Ray, enable Active tracing. On runtimes with a corresponding X-Ray SDK, Lambda also runs the X-Ray daemon. To use the X-Ray SDK on Lambda, bundle it with your function code each time you create a new version. The primary difference is that you don't use the SDK to instrument incoming requests, make sampling decisions, and create segments.

## S2 Visualize Lambda Event Function invocations using AWS X-Ray — Active tracing and permissions
url: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray
fetched: 2026-11-26
> If you've enabled Active tracing for your Event Function, Lambda automatically sends traces to X-Ray for sampled requests. Your Event Function needs permission to upload trace data to X-Ray. When you activate tracing in the Lambda console, Lambda adds the required permissions to your Event Function's execution role. Otherwise, add the AWSXRayDaemonWriteAccess policy to the execution role. X-Ray doesn't trace all requests to your application. The sampling rate is 1 request per second and 5 percent of additional requests. You can't configure the X-Ray sampling rate for your functions.

> If you do not have Active tracing turned on, Lambda defaults to PassThrough tracing mode. In PassThrough mode, Lambda forwards the X-Ray tracing header to downstream services, but does not send traces automatically. Lambda needs the following permissions to send trace data to X-Ray. Add them to your Event Function's execution role. These permissions are included in the AWSXRayDaemonWriteAccess managed policy. If your solution depends on this passive tracing behavior, switch to Active tracing.

> The following example AWS CLI command enables active tracing on a function named my-function. Tracing mode is part of the version-specific configuration when you publish a version of your function. You can't change the tracing mode on a published version.

## S3 Amazon API Gateway active tracing support for AWS X-Ray — Enabling active tracing on a stage
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html#xray-services-apigateway
fetched: 2026-11-26
> Amazon API Gateway provides active tracing support for AWS X-Ray. Enable active tracing on your API stages to sample incoming requests and send traces to X-Ray. On the Logs/Tracing tab, choose Enable X-Ray Tracing and then choose Save Changes. To redeploy the API with the new settings, choose the Actions dropdown, and then choose Deploy API. API Gateway uses sampling rules that you define in the X-Ray console to determine which requests to record. X-Ray only supports tracing for REST APIs through API Gateway. If active tracing is disabled, the stage still records a segment if the request comes from a service that sampled the request and started a trace. For all incoming requests, API Gateway adds a tracing header to incoming HTTP requests that don't already have one.

## S4 Running the X-Ray daemon on Amazon ECS — Daemon as a container in an ECS task
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon-ecs.html#xray-daemon-ecs
fetched: 2026-11-26
> In Amazon ECS, create a Docker image that runs the X-Ray daemon, upload it to a Docker image repository, and then deploy it to your Amazon ECS cluster. You can use port mappings and network mode settings in your task definition file to allow your application to communicate with the daemon container. X-Ray provides a Docker container image on Amazon ECR that you can deploy alongside your application. Add managed policies to your task role to grant the daemon permission to upload trace data to X-Ray.

## S5 Configuring sampling rules — Sampling rules for ADOT and the X-Ray SDK
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-sampling.html#xray-console-sampling
fetched: 2026-11-26
> You can use the AWS X-Ray console to configure sampling rules for your services. The AWS Distro for OpenTelemetry, X-Ray SDK, and AWS services that support active tracing with sampling configurations use sampling rules to determine which requests to record. Sampling rules tell the AWS Distro for OpenTelemetry (ADOT) or X-Ray SDK how many requests to record for a set of criteria. By default, the SDK records the first request each second, and five percent of any additional requests. The AWS Distro for OpenTelemetry (ADOT) and X-Ray SDK requires additional configuration to use sampling rules that you configure in the console. For API Gateway, see Amazon API Gateway active tracing support for AWS X-Ray.

> Instrument AWS Distro for OpenTelemetry on compute platforms – When using compute platforms such as Amazon EC2, Amazon ECS, or AWS Elastic Beanstalk, sampling is supported when the application has been instrumented with the latest AWS Distro for OpenTelemetry or X-Ray SDK.
