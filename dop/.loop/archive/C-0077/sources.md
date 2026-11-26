# C-0077 sources

## S0 AWS KMS keys — AWS managed keys（新規受付の停止）
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-key
fetched: 2026-11-26
> AWS managed keys are a legacy key type that is no longer being created for new AWS services as of 2021.

## S1 AWS KMS keys — AWS KMS keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#concepts
fetched: 2026-11-26
> The KMS keys that you create and manage for use in your own cryptographic applications are of a type known as customer managed keys.
> Customer managed keys are recommended for customers who want full control over the lifecycle and usage of their keys.
> Use customer managed keys when control is important, but use AWS owned keys when convenience is most important.

## S2 AWS KMS keys — Customer managed keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-mgn-key
fetched: 2026-11-26
> Customer managed keys are KMS keys in your AWS account that you create, own, and manage.
> You have full control over these KMS keys, including establishing and maintaining their key policies, IAM policies, and grants, enabling and disabling them, rotating their cryptographic material, adding tags, creating aliases that refer to the KMS keys, and scheduling the KMS keys for deletion.

## S3 AWS KMS keys — AWS managed keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-key
fetched: 2026-11-26
> AWS managed keys are KMS keys in your account that are created, managed, and used on your behalf by an AWS service integrated with AWS KMS.
> All AWS managed keys are automatically rotated every year.

## S4 AWS KMS keys — AWS owned keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-key
fetched: 2026-11-26
> AWS owned keys are a collection of KMS keys that an AWS service owns and manages for use in multiple AWS accounts.
> Because these keys are owned and managed by AWS, you are not charged for their existence or their usage, you cannot change their policies, you cannot audit activities on these keys, and you cannot delete them.

## S5 Rotate AWS KMS keys — Rotate AWS KMS keys
url: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
fetched: 2026-11-26
> By default, when you enable automatic key rotation for a KMS key, AWS KMS generates new cryptographic material for the KMS key every year.
> Key rotation changes only the current key material, which is the cryptographic secret that is used in encryption operations.
> Manual rotation is a good choice when you want to rotate KMS keys that are not eligible for automatic or on-demand key rotation, including asymmetric KMS keys, HMAC KMS keys and KMS keys in custom key stores.

## S6 Rotate AWS KMS keys — Key rotation has no effect on data
url: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys
fetched: 2026-11-26
> Key rotation has no effect on the data that the KMS key protects.
> Key rotation will not mitigate the effect of a compromised data key.

## S7 Managed certificate renewal in AWS Certificate Manager — Managed certificate renewal
url: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html#managed-renewal
fetched: 2026-11-26
> ACM provides managed renewal for your Amazon-issued SSL/TLS certificates.
> This means that ACM will either renew your certificates automatically (if you are using DNS validation), or it will send you email notices when expiration is approaching.
> When ACM renews a certificate, the certificate's Amazon Resource Name (ARN) remains the same.
> Certificates issued through ACME certificate automation are not eligible for ACM managed renewal.

## S8 What is AWS CloudHSM? — What is AWS CloudHSM?
url: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
fetched: 2026-11-26
> AWS CloudHSM combines the benefits of the AWS cloud with the security of hardware security modules (HSMs).
> HSMs are general purpose, single tenant, and either FIPS 140-2 level-3 or FIPS 140-3 level-3 validated for clusters in FIPS mode
> You can generate, store, import, export, manage, and use cryptographic keys (including, session keys, token keys, symmetric keys and asymmetric key pairs).
> Because your data plane is end-to-end (E2E) encrypted and not visible to AWS, you control your own user management (outside of IAM roles).

## S9 Reducing the cost of SSE-KMS with Amazon S3 Bucket Keys — S3 Bucket Keys for SSE-KMS
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key-overview
fetched: 2026-11-26
> Using a bucket-level key for SSE-KMS can reduce AWS KMS request costs by up to 99 percent by decreasing the request traffic from Amazon S3 to AWS KMS.
> When you configure an S3 Bucket Key, objects that are already in the bucket do not use the S3 Bucket Key.
> Amazon S3 will only share an S3 Bucket Key for objects encrypted by the same AWS KMS key.
