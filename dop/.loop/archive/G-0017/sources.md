# 事典 G-0017: AWS Certificate Manager、AWS CloudHSM

## S1 AWS Certificate Manager — What is AWS Certificate Manager?
url: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
fetched: 2026-11-26
> AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications. You can provide certificates for your integrated AWS services either by issuing them directly with ACM or by importing third-party certificates into the ACM management system. ACM certificates can secure singular domain names, multiple specific domain names, wildcard domains, or combinations of these. ACM wildcard certificates can protect an unlimited number of subdomains. You can also export ACM certificates signed by AWS Private CA for use anywhere in your internal PKI.

## S2 AWS Certificate Manager — Managed certificate renewal in AWS Certificate Manager
url: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html#managed-renewal
fetched: 2026-11-26
> ACM provides managed renewal for your Amazon-issued SSL/TLS certificates. This means that ACM will either renew your certificates automatically (if you are using DNS validation), or it will send you email notices when expiration is approaching. These services are provided for both public and private ACM certificates.

## S3 AWS Certificate Manager — Managed automation with integrated services
url: https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html#acm-services
fetched: 2026-11-26
> AWS Certificate Manager supports a growing number of AWS services that can use ACM certificates directly. ACM is integrated with Elastic Load Balancing to deploy ACM certificates on the load balancer. ACM is integrated with CloudFront to deploy ACM certificates on the CloudFront distribution.

## S4 AWS CloudHSM — What is AWS CloudHSM?
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
fetched: 2026-11-26
> AWS CloudHSM combines the benefits of the AWS cloud with the security of hardware security modules (HSMs). A hardware security module (HSM) is a computing device that processes cryptographic operations and provides secure storage for cryptographic keys. With AWS CloudHSM, you have complete control over high availability HSMs that are in the AWS Cloud, have low-latency access, and a secure root of trust that automates HSM management (including backups, provisioning, configuration, and maintenance). AWS CloudHSM gives you full control of the algorithms and keys you use. You can generate, store, import, export, manage, and use cryptographic keys (including, session keys, token keys, symmetric keys and asymmetric key pairs).

## S5 AWS CloudHSM — AWS CloudHSM use cases
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/use-cases.html#use-cases
fetched: 2026-11-26
> Businesses that need to align with enterprise security standards can use AWS CloudHSM to manage private keys that protect highly confidential data. Use AWS CloudHSM to manage private keys that protect highly confidential data, encryption in transit, and encryption at rest. Additionally, AWS CloudHSM offers standards-compliant integration with multiple cryptographic SDKs.
