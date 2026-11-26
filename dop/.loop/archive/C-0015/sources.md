## S1 Working with the CodeDeploy agent — 役割と必要な場面
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html
fetched: 2026-11-26
> The AWS CodeDeploy agent is a software package that, when installed and configured on an instance, makes it possible for that instance to be used in CodeDeploy deployments.
> Note The CodeDeploy agent is required only if you deploy to an EC2/On-Premises compute platform. The agent is not required for deployments that use the Amazon ECS or AWS Lambda compute platform.
> A configuration file is placed on the instance when the agent is installed. This file is used to specify how the agent works.

## S2 Working with the CodeDeploy agent — 通信と対応 OS
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-outbound-port
fetched: 2026-11-26
> The CodeDeploy agent communicates outbound using HTTPS over port 443. When the CodeDeploy agent runs on an EC2 instance, it will use the EC2 metadata endpoint to retrieve instance related information.

## S3 Working with the CodeDeploy agent — 対応 OS（EC2）
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-supported-operating-systems-ec2
fetched: 2026-11-26
> The CodeDeploy agent has been tested on the following Amazon EC2 AMI operating systems:
> Windows Server 2016, 2019, 2022, 2025 (x86_64)
> macOS 15, 26, 27 on EC2 Mac instances with Apple silicon (aarch64)
> macOS is supported on the CodeDeploy agent version 2.1.2 and later only.

## S4 Working with the CodeDeploy agent — 管理と配置ファイル
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-processes
fetched: 2026-11-26
> The CodeDeploy agent uses systemd to manage the agent process on all supported Linux distributions. To manage the CodeDeploy agent, use the systemctl utility:
> sudo systemctl start codedeploy-agent sudo systemctl stop codedeploy-agent sudo systemctl restart codedeploy-agent sudo systemctl status codedeploy-agent

## S5 Working with the CodeDeploy agent — ログとルートディレクトリ
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent.html#codedeploy-agent-install-files
fetched: 2026-11-26
> The CodeDeploy agent stores revisions, deployment history, and deployment scripts in its root directory on an instance. The default name and location of this directory is: '/opt/codedeploy-agent/deployment-root' for Amazon Linux, Ubuntu Server, RHEL, and macOS instances.
> CodeDeploy logs: For Amazon Linux, Ubuntu Server, RHEL, and macOS instances, the CodeDeploy agent rotates the log files under the /var/log/aws/codedeploy-agent folder. The agent deletes log files after seven days.

## S6 Install the CodeDeploy agent using AWS Systems Manager — SSM でのインストールと更新
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ssm.html
fetched: 2026-11-26
> You can use the AWS Management Console or the AWS CLI to install the CodeDeploy agent to your Amazon EC2 or on-premises instances by using AWS Systems Manager. You can choose to install a specific version or choose to always install the latest version of the agent.
> On an Amazon EC2 instance, the CodeDeploy agent requires that the instance is running version 2.3.274.0 or later. Before you install the CodeDeploy agent, update or install SSM agent on the instance if you haven't already done so.
> With SSM, you can install the CodeDeploy once or set up a schedule to install new versions.
> For version 2.0.x and later, choose the AWSCodeDeployAgentV2 package. This is the only package that supports macOS, starting with version 2.1.2.

## S7 Configure an Amazon EC2 instance to work with CodeDeploy — IAM インスタンスプロファイルの確認
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-configure.html#instances-ec2-configure-1-verify-instance-profile-attached
fetched: 2026-11-26
> In the details pane, on the Description tab, note the value in the IAM role field, and then proceed to the next section. If the field is empty, you can attach an IAM instance profile to the instance.

## S8 Configure an Amazon EC2 instance to work with CodeDeploy — S3 からの取得の権限
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-configure.html#instances-ec2-configure-2-verify-instance-profile-permissions
fetched: 2026-11-26
> If there is no entry in Trusted Entities that reads The identity provider(s) ec2.amazonaws.com, you cannot use this Amazon EC2 instance. If there is an entry that reads The identity provider(s) ec2.amazonaws.com, and you are storing your applications in Amazon S3 buckets, choose the Permissions tab.
> If "s3:Get*" and "s3:List*" are not in the list of specified actions, choose Edit to add them, and then choose Save.
> Make sure to give access to the Amazon S3 buckets that contain the CodeDeploy agent. Otherwise, an error might occur when the CodeDeploy agent is installed or updated on the instances.

## S9 Troubleshoot instance issues — エージェントが入っていない・動いていない時
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-ec2-instances.html#troubleshooting-sds-agent
fetched: 2026-11-26
> To verify the CodeDeploy agent is installed and running on an instance, see Verify the CodeDeploy agent is running. To install, uninstall, or reinstall the CodeDeploy agent, see Install the CodeDeploy agent.

## S10 Troubleshoot instance issues — 終了・タグ付け時の失敗
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-ec2-instances.html#troubleshooting-one-hour-timeout
fetched: 2026-11-26
> If the scripts don't run to completion while a lifecycle event is in progress (for example, if an instance is terminated or the CodeDeploy agent is shut down), it might take up to an hour for the status of the deployment to be displayed as Failed. This is because when the instance is terminated, the CodeDeploy agent shuts down and cannot process more scripts. If an instance is terminated between lifecycle events or before the first lifecycle event step starts, the timeout occurs after just five minutes.

## S11 Verify the CodeDeploy agent is running — Amazon Linux・RHEL での確認
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-verify.html#codedeploy-agent-operations-verify-linux
fetched: 2026-11-26
> To see if the CodeDeploy agent is installed and running, sign in to the instance, and run the following command: systemctl status codedeploy-agent. If the command returns an error, the CodeDeploy agent is not installed. If you see a message like The AWS CodeDeploy agent is not running. (exit code 3), start the service and run the following two commands, one at a time: systemctl start codedeploy-agent systemctl status codedeploy-agent.

## S12 Verify the CodeDeploy agent is running — Windows Server での確認
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-verify.html#codedeploy-agent-operations-verify-windows
fetched: 2026-11-26
> If Status shows anything other than Running, start the service with the following command: powershell.exe -Command Start-Service -Name codedeployagent
