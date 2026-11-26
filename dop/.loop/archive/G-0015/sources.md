## S0 告知: AWS X-Ray SDK と Daemon は保守モード（表の Maintenance mode の開始日は February 25th, 2026）
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-daemon-timeline.html#xray-sdk-daemon-timeline
fetched: 2026-11-26
> AWS will limit X-Ray SDK and Daemon releases to address security issues only. The SDKs/Daemon will not receive new feature enhancements. We recommend that you migrate to OpenTelemetry solutions for instrumenting your application and sending traces to AWS X-Ray.

## S1 AWS X-Ray — 役割
url: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
fetched: 2026-11-26
> AWS X-Ray is a service that collects data about requests that your application serves, and provides tools that you can use to view, filter, and gain insights into that data to identify issues and opportunities for optimization. For any traced request to your application, you can see detailed information not only about the request and response, but also about calls that your application makes to downstream AWS resources, microservices, databases, and web APIs.

## S2 AWS X-Ray — 主な機能（デーモンとトレースマップ）
url: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
fetched: 2026-11-26
> Instead of sending trace data directly to X-Ray, each client SDK sends JSON segment documents to a daemon process listening for UDP traffic. The X-Ray daemon buffers segments in a queue and uploads them to X-Ray in batches. X-Ray uses trace data from the AWS resources that power your cloud applications to generate a detailed trace map. The trace map shows the client, your front-end service, and backend services that your front-end service calls to process requests and persist data. Use the trace map to identify bottlenecks, latency spikes, and other issues to solve to improve the performance of your applications.

## S3 AWS X-Ray — 主な機能（トレース・サービスマップ・サンプリング）
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts
fetched: 2026-11-26
> AWS X-Ray receives data from services as segments. X-Ray then groups segments that have a common request into traces. X-Ray processes the traces to generate a service graph that provides a visual representation of your application.

## S4 Amazon API Gateway — 役割
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#welcome
fetched: 2026-11-26
> Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale. API developers can create APIs that access AWS or other web services, as well as data stored in the AWS Cloud.

## S5 Amazon API Gateway — 役割（フロントドアとしての位置）
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#api-gateway-overview-aws-backbone
fetched: 2026-11-26
> API Gateway acts as a "front door" for applications to access data, business logic, or functionality from your backend services, such as workloads running on Amazon Elastic Compute Cloud (Amazon EC2), code running on AWS Lambda, any web application, or real-time communication applications. API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls. These tasks include traffic management, authorization and access control, monitoring, and API version management.

## S6 Amazon API Gateway — 主な機能
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#api-gateway-overview-features
fetched: 2026-11-26
> Amazon API Gateway offers features such as the following: Support for stateful (WebSocket) and stateless (HTTP and REST) APIs. Powerful, flexible authentication mechanisms, such as AWS Identity and Access Management policies, Lambda authorizer functions, and Amazon Cognito user pools. Canary release deployments for safely rolling out changes. CloudTrail logging and monitoring of API usage and API changes. Integration with AWS WAF for protecting your APIs against common web exploits.

## S7 Amazon API Gateway — 主な機能（カナリアリリース）
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
fetched: 2026-11-26
> In a canary release deployment, total API traffic is separated at random into a production release and a canary release with a pre-configured ratio. Typically, the canary release receives a small percentage of API traffic and the production release takes up the rest. The updated API features are only visible to API traffic through the canary. You can adjust the canary traffic percentage to optimize test coverage or performance.
