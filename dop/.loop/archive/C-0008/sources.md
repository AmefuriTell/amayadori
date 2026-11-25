## S1 Amazon ECS task definition parameters — Health check

url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_healthcheck
fetched: 2026-11-26

> A string array that represents the command that the container runs to determine if it's healthy.
> An exit code of 0, with no stderr output, indicates success, and a non-zero exit code indicates failure.
> The period of time (in seconds) between each health check. You can specify between 5 and 300 seconds. The default value is 30 seconds.
> The period of time (in seconds) to wait for a health check to succeed before it's considered a failure. You can specify between 2 and 60 seconds. The default value is 5 seconds.
> The number of times to retry a failed health check before the container is considered unhealthy. You can specify between 1 and 10 retries. The default value is three retries.
> The optional grace period to provide containers time to bootstrap in before failed health checks count towards the maximum number of retries. You can specify a value between 0 and 300 seconds. By default, startPeriod is disabled.
> If a health check succeeds within the startPeriod, then the container is considered healthy and any subsequent failures count toward the maximum number of retries.

## S2 Amazon ECS task definition parameters — Container definitions — essential

url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
fetched: 2026-11-26

> Suppose that the essential parameter of a container is marked as true, and that container fails or stops for any reason. Then, all other containers that are part of the task are stopped.
> If the essential parameter of a container is marked as false, then its failure doesn't affect the rest of the containers in a task. If this parameter is omitted, a container is assumed to be essential.
> All tasks must have at least one essential container.

## S3 Determine Amazon ECS task health using container health checks — How Amazon ECS determines task health

url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/healthcheck.html#task-determination
fetched: 2026-11-26

> Containers that are essential and have health check command in the task definition are the only ones considered to determine the task health.
> If the status of one essential container is UNHEALTHY, then the task status is UNHEALTHY.
> If the status of one essential container is UNKNOWN, then the task status is UNKNOWN.
> If the status of all essential containers are HEALTHY, then the task status is HEALTHY.

## S4 AppSpec 'hooks' section — Structure of 'hooks' section

url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-section-structure
fetched: 2026-11-26

> Optional. The number of seconds to allow the script to execute before it is considered to have failed. The default is 3600 seconds (1 hour).
> 3600 seconds (1 hour) is the maximum amount of time allowed for script execution for each deployment lifecycle event. If scripts exceed this limit, the deployment stops and the deployment to the instance fails.

## S5 AppSpec 'hooks' section — List of lifecycle event hooks — ValidateService

url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list
fetched: 2026-11-26

> ValidateService – This is the last deployment lifecycle event. It is used to verify the deployment was completed successfully.

## S6 Troubleshoot EC2/On-Premises deployment issues — Long-running processes can cause deployments to fail

url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-long-running-processes
fetched: 2026-11-26

> For deployments to Amazon Linux, Ubuntu Server, and RHEL instances, if you have a deployment script that starts a long-running process, CodeDeploy might spend a long time waiting in the deployment lifecycle event and then fail the deployment.
> After the timeout of one minute (60 seconds), CodeDeploy stops and fails the deployment at the AfterInstall application lifecycle event, even though sleep.sh continues to run as expected.
> Script at specified location: after-install.sh failed to complete in 60 seconds.
