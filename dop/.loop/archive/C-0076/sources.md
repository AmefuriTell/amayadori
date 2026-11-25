## S1 What is Amazon Macie? — Features of Macie
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#macie-features
fetched: 2026-11-26
> With Macie, you can automate discovery and reporting of sensitive data in two ways: by configuring Macie to perform automated sensitive data discovery, and by creating and running sensitive data discovery jobs.
> Automated sensitive data discovery provides broad visibility into where sensitive data might reside in your Amazon S3 data estate.
> With this option, Macie continually evaluates your S3 bucket inventory and uses sampling techniques to identify and select representative S3 objects from your buckets.
> Sensitive data discovery jobs provide deeper, more targeted analysis.
> With this option, you define the breadth and depth of the analysis—the S3 buckets to analyze, the sampling depth, and custom criteria that derive from properties of S3 objects.

## S2 Running sensitive data discovery jobs — Running sensitive data discovery jobs
url: https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html#discovery-jobs
fetched: 2026-11-26
> A sensitive data discovery job is a series of automated processing and analysis tasks that Macie performs to detect and report sensitive data in Amazon S3 objects.
> You can configure a job to run only once for on-demand analysis and assessment, or on a recurring basis for periodic analysis, assessment, and monitoring.
> You can configure a job to use managed data identifiers that Macie provides, custom data identifiers that you define, or a combination of the two.
> To fine tune the analysis, you can also configure a job to use allow lists.
> Macie creates a sensitive data discovery result for each object that you configure a job to analyze.
> A sensitive data finding is a detailed report of sensitive data that Macie found in an S3 object.

## S3 Using managed data identifiers — Using managed data identifiers
url: https://docs.aws.amazon.com/macie/latest/user/managed-data-identifiers.html#managed-data-identifiers
fetched: 2026-11-26
> Amazon Macie uses a combination of criteria and techniques, including machine learning and pattern matching, to detect sensitive data in Amazon Simple Storage Service (Amazon S3) objects.
> Each managed data identifier is designed to detect a specific type of sensitive data—for example, AWS secret access keys, credit card numbers, or passport numbers for a particular country or region.
> Within each category, Macie can detect multiple types of sensitive data.
> When you create a sensitive data discovery job or configure settings for automated sensitive data discovery, you can use these IDs to specify which managed data identifiers you want Macie to use when it analyzes S3 objects.

## S4 Building custom data identifiers — Building custom data identifiers
url: https://docs.aws.amazon.com/macie/latest/user/custom-data-identifiers.html#custom-data-identifiers
fetched: 2026-11-26
> A custom data identifier is a set of criteria that you define to detect sensitive data in Amazon Simple Storage Service (Amazon S3) objects.
> The criteria consist of a regular expression (regex) that defines a text pattern to match and, optionally, character sequences and a proximity rule that refine the results.
> With custom data identifiers, you can define detection criteria that reflect your organization's particular scenarios, intellectual property, or proprietary data.
> If you configure sensitive data discovery jobs or automated sensitive data discovery to use these identifiers, you can supplement the managed data identifiers that Macie provides.
> By default, Macie assigns the Medium severity to all the findings that a custom data identifier produces.

## S5 Defining sensitive data exceptions with allow lists — Defining sensitive data exceptions with allow lists
url: https://docs.aws.amazon.com/macie/latest/user/allow-lists.html#allow-lists
fetched: 2026-11-26
> With allow lists in Amazon Macie, you can define specific text and text patterns that you want Macie to ignore when it inspects Amazon Simple Storage Service (Amazon S3) objects for sensitive data.
> If data matches text or a text pattern in an allow list, Macie doesn’t report the data.
> This is the case even if the data matches the criteria of a managed data identifier or a custom data identifier.
> After you create an allow list, you can create and configure sensitive data discovery jobs to use it, or add it to your settings for automated sensitive data discovery.
> If Macie finds text that matches an entry or pattern in an allow list, Macie doesn’t report that occurrence of text in sensitive data findings, statistics, and other types of results.

## S6 Managing multiple Macie accounts as an organization — Managing multiple Macie accounts as an organization
url: https://docs.aws.amazon.com/macie/latest/user/macie-accounts.html#macie-accounts
fetched: 2026-11-26
> In Macie, an organization consists of a designated Macie administrator account and one or more associated member accounts.
> You can associate the accounts in two ways, by integrating Macie with AWS Organizations or by sending and accepting membership invitations in Macie.
> We recommend that you integrate Macie with AWS Organizations.
> In a multiple-account configuration, a designated Macie administrator can perform certain tasks and access certain Macie settings, data, and resources for accounts that are members of the same organization.
> Tasks include reviewing information about S3 buckets that are owned by member accounts, reviewing policy findings for those buckets, and inspecting the buckets for sensitive data.
> If the accounts are associated through AWS Organizations, the Macie administrator can also enable Macie for member accounts in the organization.

## S0 What is Amazon Macie? — Security Hub の名前（従来の表記との食い違い）
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#macie-features
fetched: 2026-11-26
> You can configure Macie to also publish findings to AWS Security Hub CSPM.
