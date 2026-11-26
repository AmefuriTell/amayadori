## S1 What is Amazon EKS? — Amazon EKS: Simplified Kubernetes Management
url: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html#_amazon_eks_simplified_kubernetes_management
fetched: 2026-11-26
> Amazon Elastic Kubernetes Service (EKS) provides a fully managed Kubernetes service that eliminates the complexity of operating Kubernetes clusters.
> Amazon Elastic Kubernetes Service (Amazon EKS) is the premier platform for running Kubernetes clusters, both in the Amazon Web Services (AWS) cloud and in your own data centers (EKS Anywhere and Amazon EKS Hybrid Nodes).
> Amazon EKS simplifies building, securing, and maintaining Kubernetes clusters.
> EKS standard: AWS manages the Kubernetes control plane when you create a cluster with EKS.

## S2 What is Amazon EKS? — Features of Amazon EKS
url: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html#eks-features
fetched: 2026-11-26
> Amazon EKS provides the following high-level features:
> EKS offers multiple interfaces to provision, manage, and maintain clusters, including AWS Management Console, Amazon EKS API/SDKs, CDK, AWS CLI, eksctl CLI, AWS CloudFormation, and Terraform.
> EKS relies on both Kubernetes and AWS Identity and Access Management (AWS IAM) features to manage access from users and workloads.
> For compute resources, EKS allows the full range of Amazon EC2 instance types and AWS innovations such as Nitro and Graviton with Amazon EKS for you to optimize the compute for your workloads.
> EKS Auto Mode automatically creates storage classes using EBS volumes.
> EKS provides managed cluster capabilities for continuous deployment, cloud resource management, and resource composition based on open source innovations.
> EKS installs Kubernetes APIs in your clusters, but controllers and other components run in EKS and are fully managed, providing automated patching, scaling, and monitoring.

## S3 Manage compute resources by using nodes — Amazon EKS: Manage compute resources by using nodes
url: https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html#eks-compute
fetched: 2026-11-26
> A Kubernetes node is a machine that runs containerized applications.
> Your Amazon EKS cluster can schedule Pods on any combination of EKS Auto Mode managed nodes, self-managed nodes, Amazon EKS managed node groups, AWS Fargate, and Amazon EKS Hybrid Nodes.
> On nodes in the AWS Cloud, you can run selected pods inside hardware-isolated virtual machines with Nitro Sandboxes, instead of standard containers that share the node’s kernel.
