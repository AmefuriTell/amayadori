## S1 AWS Certified DevOps Engineer - Professional（試験ガイド Content Domain 2）— Task Statement 2.3 Knowledge of
url: https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/devops-engineer-professional-02-domain2.html#dop-02-task-2-3-knowledge
fetched: 2026-11-26
> AWS services and solutions to automate tasks and processes
> Methods and strategies to interact with the AWS software-defined infrastructure

## S2 AWS Certified DevOps Engineer - Professional（試験ガイド Content Domain 2）— Task Statement 2.3 Skills in
url: https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/devops-engineer-professional-02-domain2.html#dop-02-task-2-3-skills
fetched: 2026-11-26
> Automating system inventory, configuration, and patch management (for example, Systems Manager, AWS Config)
> Automating the configuration of software applications to the desired state (for example, OpsWorks, Systems Manager State Manager)
> Maintaining software compliance (for example, Systems Manager)

## S3 AWS Certified DevOps Engineer - Professional（In-Scope AWS Services）— Management and Governance
url: https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/dop-02-in-scope-services.html#dop-02-management-governance
fetched: 2026-11-26
> AWS OpsWorks
> AWS Systems Manager

## S4 Understanding how State Manager works — Understanding how State Manager works
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about
fetched: 2026-11-26
> State Manager is a secure and scalable service that automates the process of keeping managed nodes in a hybrid and multicloud infrastructure in a state that you define.
> A State Manager association is a configuration that you assign to your AWS resources.
> The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.
> Preconfigured documents are ready to perform common tasks like installing applications, configuring Amazon CloudWatch, running AWS Systems Manager automations, running PowerShell and Shell scripts, and joining managed nodes to a directory service domain for Active Directory.
> Here are two examples: AWS-ConfigureAWSPackage and AWS-InstallApplication.
> If your targets include more than 1,000 nodes, the system uses an hourly throttling mechanism.
> If you create a new association that is scheduled to run while an earlier association is still running, the earlier association times out and the new association runs.

## S5 Understanding when associations are applied to resources — Understanding when associations are applied to resources
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html#state-manager-about-scheduling
fetched: 2026-11-26
> By default, State Manager runs the association when you create it and then according to your schedule.

## S6 Creating associations that run Ansible playbooks — Creating associations that run Ansible playbooks
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state-manager-ansible.html#systems-manager-state-manager-ansible
fetched: 2026-11-26
> You can create State Manager associations that run Ansible playbooks by using the AWS-ApplyAnsiblePlaybooks SSM document.
> The AWS-RunAnsiblePlaybook document is deprecated.
> We recommend that you use the AWS-ApplyAnsiblePlaybooks document because of the enhancements described here.
> The AWS-ApplyAnsiblePlaybooks document supports bundled, complex playbooks because it copies the entire file structure to a local directory before executing the specified main playbook.
> Associations that run Ansible playbooks aren't supported on macOS.

## S7 AWS Systems Manager Compliance — AWS Systems Manager Compliance
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-compliance.html#systems-manager-compliance
fetched: 2026-11-26
> You can use Compliance to scan your fleet of managed nodes for patch compliance and configuration inconsistencies.
> By default, Compliance displays current compliance data about patching in Patch Manager and associations in State Manager.
> Remediate issues by using Run Command, another tool in AWS Systems Manager, State Manager, or Amazon EventBridge.
> Systems Manager integrates with Chef InSpec.

## S8 AWS Systems Manager Distributor — AWS Systems Manager Distributor
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/distributor.html#distributor
fetched: 2026-11-26
> Distributor helps you package and publish software to AWS Systems Manager managed nodes.
> One time by using AWS Systems Manager Run Command
> On a schedule by using AWS Systems Manager State Manager
> When you create a package in Distributor, the system creates an AWS Systems Manager document (SSM document).
> You can use Run Command or State Manager to control which of your managed nodes get a package and which version of that package.

## S9 Run commands at scale — Using rate controls
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-velocity
fetched: 2026-11-26
> You can control the number of managed nodes that run a command simultaneously by using the max-concurrency parameter (the Concurrency options in the Run a command page).
> You can specify either an absolute number of managed nodes, for example 10, or a percentage of the target set, for example 10%.
> The default for value max-concurrency is 50.

## S10 Run commands at scale — Using error controls
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
fetched: 2026-11-26
> The parameter specifies how many errors are allowed before the system stops sending the command to additional managed nodes.
> If you specify 0, then the system stops sending the command to additional managed nodes after the first error result is returned.
> If you send a command to 50 managed nodes and set max-errors to 10%, then the system stops sending the command to additional nodes when the sixth error is received.

## S11 AWS Systems Manager Run Command — AWS Systems Manager Run Command
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html#run-command
fetched: 2026-11-26
> Using Run Command, you can remotely and securely manage the configuration of your managed nodes.
> With Run Command, you can automate common administrative tasks and perform one-time configuration changes at scale.
