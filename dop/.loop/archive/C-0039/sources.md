## S1 Understanding Lambda Event Function scaling — Understanding reserved concurrency and provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-and-provisioned
fetched: 2026-11-26
> By default, your account has a concurrency limit of 1,000 concurrent executions across all Event Functions in a Region.
> Your Event Functions experience throttling (that is, they start to drop requests) if you run out of available concurrency.
> Use reserved concurrency to set both the maximum and minimum number of concurrent instances to reserve a portion of your account's concurrency for an Event Function.
> Use provisioned concurrency to pre-initialize a number of environment instances for an Event Function.
> This is useful for reducing cold start latencies.

## S2 Understanding Lambda Event Function scaling — Reserved concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-concurrency-concept
fetched: 2026-11-26
> Reserved concurrency sets the maximum and minimum number of concurrent instances that you want to allocate to your Event Function.
> Event Functions that don't have reserved concurrency share the remaining pool of unreserved concurrency.
> Configuring reserved concurrency counts towards your overall account concurrency limit.
> There is no charge for configuring reserved concurrency for an Event Function.

## S3 Understanding Lambda Event Function scaling — Provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#provisioned-concurrency-concept
fetched: 2026-11-26
> You use reserved concurrency to define the maximum number of execution environments reserved for a Lambda Event Function.
> However, none of these environments come pre-initialized.
> When Lambda has to initialize a new environment to carry out an invocation, this is known as a cold start.
> To mitigate cold starts, you can use provisioned concurrency.
> Provisioned concurrency is the number of pre-initialized execution environments that you want to allocate to your Event Function.
> Using provisioned concurrency incurs additional charges to your account.

## S4 Understanding Lambda Event Function scaling — How Lambda allocates provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#allocating-provisioned-concurrency
fetched: 2026-11-26
> Provisioned concurrency doesn't come online immediately after you configure it.
> Lambda starts allocating provisioned concurrency after a minute or two of preparation.
> For each Event Function, Lambda can provision up to 6,000 execution environments every minute, regardless of AWS Region.
> When you submit a request to allocate provisioned concurrency, you can't access any of those environments until Lambda completely finishes allocating them.

## S5 Understanding Lambda Event Function scaling — Concurrency quotas
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#concurrency-quotas
fetched: 2026-11-26
> At the account level, your Event Functions can have up to 1,000 units of concurrency by default.
> At the function level, you can reserve up to 900 units of concurrency across all your Event Functions by default.
> Regardless of your total account concurrency limit, Lambda always reserves 100 units of concurrency for your Event Functions that don't explicitly reserve concurrency.

## S6 Configuring provisioned concurrency for an Event Function — Using Application Auto Scaling to automate provisioned concurrency management
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#managing-provisioned-concurency
fetched: 2026-11-26
> You can use Application Auto Scaling to manage provisioned concurrency on a schedule or based on utilization.
> If you use Application Auto Scaling to manage your Event Function's provisioned concurrency, ensure that you configure an initial provisioned concurrency value first.
> If your Event Function doesn't have an initial provisioned concurrency value, Application Auto Scaling might not handle Event Function scaling properly.

## S7 Configuring provisioned concurrency for an Event Function — Scheduled scaling and target tracking
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#managing-provisioned-concurrency-targeting
fetched: 2026-11-26
> With Application Auto Scaling, you can set your own scaling schedule according to predictable load changes.
> When these alarms activate, Application Auto Scaling automatically adjusts the amount of environments allocated using provisioned concurrency.
> Use target tracking for applications that don't have predictable traffic patterns.

## S8 Configuring provisioned concurrency for an Event Function — Understanding logging and billing behavior with provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#pc-logging-behavior
fetched: 2026-11-26
> Lambda bills you for initialization even if the environment instance never processes a request.
> Provisioned concurrency runs continually and incurs separate billing from initialization and invocation costs.

## S9 Using Lambda with Amazon SQS — Configuring provisioned mode for Amazon SQS event source mapping
url: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#sqs-configuring-provisioned-mode
fetched: 2026-11-26
> Provisioned mode cannot be used in conjunction with the maximum concurrency setting.
> When using provisioned mode, you control maximum concurrency through the maximum number of event pollers.

## S10 Throttle requests to your REST APIs for better throughput in API Gateway — Overview
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#api-gateway-request-throttling
fetched: 2026-11-26
> Both throttles and quotas are applied on a best-effort basis and should be thought of as targets rather than guaranteed request ceilings.
> API Gateway throttles requests to your API using the token bucket algorithm, where a token counts for a request.
> When request submissions exceed the steady-state request rate and burst limits, API Gateway begins to throttle requests.
> Clients may receive 429 Too Many Requests error responses at this point.
> Alternatively, you can enable usage plans to set throttles on client request submissions based on specified requests rates and quotas.

## S11 Throttle requests to your REST APIs for better throughput in API Gateway — Account-level throttling per Region
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#apig-request-throttling-account-level-limits
fetched: 2026-11-26
> By default, API Gateway limits the steady-state requests per second (RPS) across all APIs within an AWS account, per Region.
> In API Gateway, the burst limit represents the target maximum number of concurrent request submissions that API Gateway will fulfill before returning 429 Too Many Requests error responses.

## S12 Throttle requests to your REST APIs for better throughput in API Gateway — Configuring API-level and stage-level throttling targets in a usage plan
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#apigateway-api-level-throttling-in-usage-plan
fetched: 2026-11-26
> In a usage plan, you can set a per-method throttling target for all methods at the API or stage level.
> You can specify a throttling rate, which is the rate, in requests per second, that tokens are added to the token bucket.
> You can also specify a throttling burst, which is the capacity of the token bucket.

## S13 Cache settings for REST APIs in API Gateway — Overview
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#api-gateway-caching
fetched: 2026-11-26
> When you enable caching for a stage, API Gateway caches responses from your endpoint for a specified time-to-live (TTL) period, in seconds.
> The default TTL value for API caching is 300 seconds.
> The maximum TTL value is 3600 seconds.
> TTL=0 means caching is disabled.
> When you enable caching for a stage, only GET methods have caching enabled by default.
> You can enable caching for other methods by overriding method settings.

## S14 Cache settings for REST APIs in API Gateway — Enable Amazon API Gateway caching
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-caching
fetched: 2026-11-26
> In general, a larger capacity gives a better performance, but also costs more.
> API Gateway enables caching by creating a dedicated cache instance.
> This process can take up to 4 minutes.
> API Gateway changes caching capacity by removing the existing cache instance and creating a new one with a modified capacity.
> All existing cached data is deleted.
