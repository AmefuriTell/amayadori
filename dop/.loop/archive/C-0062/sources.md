## S1 Types of Amazon Route 53 health checks — Types of Amazon Route 53 health checks
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html#health-checks-types
fetched: 2026-11-26
> You can create the following types of Amazon Route 53 health checks:
> Health checks that monitor a public endpoint
> You can configure a health check that monitors a public endpoint that you specify either by IP address or by domain name.
> Health checks that monitor a private endpoint
> You can create a health check that monitors a private endpoint.
> A private endpoint is reachable from your VPC.
> Health checks that monitor other health checks (calculated health checks)
> You can create a health check that monitors whether Route 53 considers other health checks healthy or unhealthy.
> Health checks that monitor CloudWatch alarms
> You can create CloudWatch alarms that monitor the status of CloudWatch metrics, such as the number of throttled read events for an Amazon DynamoDB database or the number of Elastic Load Balancing hosts that are considered healthy.
> After you create an alarm, you can create a health check that monitors the same data stream that CloudWatch monitors for the alarm.
> To improve resiliency and availability, Route 53 doesn't wait for the CloudWatch alarm to go into the ALARM state.
> The status of a health check changes from healthy to unhealthy based on the data stream and on the criteria in the CloudWatch alarm.
> Route 53 does not support "M out of N" alarms.
> A health check can only monitor a CloudWatch alarm that exists in the same AWS account as the health check.

## S2 How Amazon Route 53 determines whether a health check is healthy — How Route 53 determines the status of health checks that monitor a public endpoint
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints-monitor-endpoint
fetched: 2026-11-26
> Route 53 has health checkers in locations around the world.
> You can choose which locations you want Route 53 to use, and you can specify the interval between checks: every 10 seconds or every 30 seconds.
> Each health checker evaluates the health of the endpoint based on two values:
> Whether the endpoint responds to a number of consecutive health checks that you specify (the failure threshold)
> Route 53 aggregates the data from the health checkers and determines whether the endpoint is healthy:
> If more than 18% of health checkers report that an endpoint is healthy, Route 53 considers it healthy.
> If 18% of health checkers or fewer report that an endpoint is healthy, Route 53 considers it unhealthy.
> HTTP and HTTPS health checks – Route 53 must be able to establish a TCP connection with the endpoint within four seconds.
> In addition, the endpoint must respond with an HTTP status code of 2xx or 3xx within two seconds after connecting.
> TCP health checks – Route 53 must be able to establish a TCP connection with the endpoint within ten seconds.
> After a Route 53 health checker receives the HTTP status code, it must receive the response body from the endpoint within the next two seconds.
> Route 53 searches the response body for a string that you specify.
> The string must appear entirely in the first 5,120 bytes of the response body or the endpoint fails the health check.

## S3 How Amazon Route 53 determines whether a health check is healthy — How Route 53 determines the status of health checks that monitor other health checks and CloudWatch alarms
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints-calculated
fetched: 2026-11-26
> A health check can monitor the status of other health checks; this type of health check is known as a calculated health check.
> One parent health check can monitor the health of up to 255 child health checks.
> When you create a health check that is based on a CloudWatch alarm, Route 53 monitors the data stream for the corresponding alarm instead of monitoring the alarm state.
> If the data stream indicates that the state of the alarm is OK, the health check is considered healthy.
> If the data stream indicates that the state is Alarm, the health check is considered unhealthy.
> If the data stream doesn't provide enough information to determine the state of the alarm, the health check status depends on the setting for Health check status: healthy, unhealthy, or last known status.
> Route 53 doesn't support cross-account CloudWatch alarms.
> Because Route 53 health checks monitor CloudWatch data streams instead of the state of CloudWatch alarms, you can't force the status of a health check to change by using the CloudWatch SetAlarmState API operation.

## S4 How Amazon Route 53 determines whether a health check is healthy — How Route 53 determines the status of a private endpoint health check
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints-private-endpoint
fetched: 2026-11-26
> For a private endpoint health check, Route 53 sends requests from the health check source in your Amazon VPC to the endpoint that you specify.
> Route 53 changes the status to unhealthy after the number of consecutive failures set by the failure threshold (default 3).
> Route 53 then updates DNS so that failover routing directs traffic to a healthy endpoint.
> The health check source must be in the Available status.

## S5 Private endpoint health checks — How private endpoint health checks work
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-private-endpoints.html#health-checks-private-endpoints-how-it-works
fetched: 2026-11-26
> A private endpoint health check monitors an endpoint that is reachable from your VPC, such as a specific IP address, domain name, or port.
> You don't need to expose any endpoint to the internet.
> When an endpoint becomes unhealthy, the private endpoint health check marks any associated DNS records as unhealthy.
> Each health check source has an IP address in each of three subnets, in three Availability Zones in the same Region as the VPC.
> You set up a health check source one time and use it for up to 200 private endpoint health checks.
> A private endpoint health check runs only from the AWS Region of its health check source.
> A private endpoint health check uses a single health check source.
> A private endpoint health check and its health check source must be in the same AWS account.
> You can't reference a private endpoint health check from a calculated health check.
