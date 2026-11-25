## S1 Define permissions based on attributes with ABAC authorization — AWS IAM User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html
fetched: 2026-11-26
> Attribute-based access control (ABAC) is an authorization strategy that defines
> permissions based on attributes. AWS calls these attributes tags. You
> can attach tags to IAM resources, including IAM entities (IAM users or IAM roles) and
> to AWS resources. You can create a single ABAC policy or small set of policies for your
> IAM principals. You can design ABAC policies that allow operations when the principal's
> tag matches the resource tag.
>
> For example, you can create three IAM roles with the access-project tag key.
> Set the tag value of the first IAM role to Heart, the second to
> Star, and the third to Lightning. You can then use a single
> policy that allows access when the IAM role and the AWS resource have the tag value
> access-project.

## S2 Comparison of ABAC to the traditional RBAC model — AWS IAM User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control_compare-rbac
fetched: 2026-11-26
> The traditional authorization model used in IAM is role-based access control (RBAC).
> RBAC defines permissions based on a person's job function, or role, which is distinct from an IAM role. IAM does include managed policies for job functions that
> align permissions to a job function in an RBAC model.
> In IAM, you implement RBAC by creating different policies for different job functions.
> You then attach the policies to identities (IAM users, IAM groups, or IAM roles). As
> a best practice, you grant the minimum permissions
> necessary for the job function. This results in least
> privilege access. Each job function policy lists the specific resources that
> identities assigned that policy can access. The disadvantage to using the traditional RBAC
> model is that when you or your users add new resources to your environment, you have to
> update the policies to allow access to those resources.
>
> ABAC provides the following advantages over the traditional RBAC model:
> ABAC requires fewer policies. Because you don't
> have to create different policies for different job functions, you create fewer
> policies. Those policies are easier to manage.
> Granular permissions are possible using ABAC.
> When you create policies, it's a best practice to grant least privilege. Using traditional
> RBAC, you write a policy that allows access to specific resources. However, when you
> use ABAC, you can allow actions on all resources if the resource's tag matches the
> principal's tag.
> Use employee attributes from your corporate directory with
> ABAC. You can configure your SAML or OIDC provider to pass session tags
> to IAM. When your employees federate into AWS, IAM applies their attributes to
> their resulting principal. You can then use ABAC to allow or deny permissions based
> on those attributes.

## S3 Pass session tags in AWS STS — AWS Identity and Access Management User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html
fetched: 2026-11-26
> Session tags are key-value pair attributes that you pass when you assume an IAM role or
> federate a user in AWS STS. You do this by making an AWS CLI or AWS API request through AWS STS or
> through your identity provider (IdP). When you use AWS STS to request temporary security
> credentials, you generate a session. Sessions expire and have credentials, such as an access key pair and a
> session token. When you use the session credentials to make a subsequent request, the request context includes the aws:PrincipalTag context key. You can
> use the aws:PrincipalTag key in the Condition element of your policies
> to allow or deny access based on those tags.
>
> The AssumeRole operation returns a set of temporary credentials you can use
> to access AWS resources. You can use IAM user or role credentials to call
> AssumeRole. To pass session tags while assuming a role, use the
> --tags AWS CLI option or the Tags AWS API parameter.
>
> Attribute-based access control (ABAC) uses an authorization strategy that defines
> permissions based on tag attributes.
> If your company uses an OIDC or SAML-based identity provider (IdP) to manage user
> identities, you can configure your assertion to pass session tags to AWS. For example, with
> corporate user identities, when your employees federate into AWS, AWS applies their
> attributes to their resulting principal. You can then use ABAC to allow or deny permissions
> based on those attributes. For details, see IAM tutorial: Use SAML session tags for ABAC.

## S4 Attributes for access control — AWS IAM Identity Center User Guide
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributesforaccesscontrol.html
fetched: 2026-11-26
> Attributes for access control is the name of the page in the
> IAM Identity Center console where you select user attributes that you want to use in policies to
> control access to resources. You can assign users to workloads in AWS based on
> existing attributes in the users' identity source.
> For example, suppose you want to assign access to S3 buckets based on department
> names. While on the Attributes for access control page, you
> select the Department user attribute for use with
> attribute-based access control (ABAC). In the IAM Identity Center permission set (or IAM role when using account access manager), you then write a
> policy that grants users access only when the Department
> attribute matches the department tag that you assigned to your S3 buckets. IAM Identity Center
> passes the user's department attribute to the account being accessed. The attribute
> is then used to determine access based on the policy. When IAM Identity Center passes these
> attributes to the account, they are sent as session tags that you can reference
> using the aws:PrincipalTag/tag-key
> condition key in all relevant AWS IAM policy types.

## S5 Manage AWS accounts with permission sets — AWS IAM Identity Center User Guide
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
fetched: 2026-11-26
> A permission set is a template that you create and maintain that defines a collection
> of one or more IAM
> policies. Permission sets simplify the assignment of AWS account access
> for users and groups in your organization. For example, you can create a Database Admin permission set that includes policies for
> administering AWS RDS, DynamoDB, and Aurora services, and use that single permission set
> to grant access to a list of target AWS accounts within your AWS Organization for your
> database administrators.
>
> IAM Identity Center assigns access to a user or group in one or more AWS accounts with permission
> sets. When you assign a permission set, IAM Identity Center creates corresponding IAM Identity Center-controlled
> IAM roles in each account, and attaches the policies specified in the permission set
> to those roles. IAM Identity Center manages the role, and allows the authorized users you’ve defined
> to assume the role, by using the IAM Identity Center User Portal or AWS CLI.  As you modify the
> permission set, IAM Identity Center ensures that the corresponding IAM policies and roles are
> updated accordingly.
>
> If your access management requires capabilities beyond what permission sets offer —
> such as custom trust policies, role tags, or configurable role paths — you can use account
> access manager in IAM.

## S6 Assign user or group access to AWS accounts — AWS IAM Identity Center User Guide
url: https://docs.aws.amazon.com/singlesignon/latest/userguide/assignusers.html
fetched: 2026-11-26
> To simplify administration of access permissions, we recommended that you
> assign access directly to groups rather than to individual users. With groups
> you can grant or deny permissions to groups of users rather than having to apply
> those permissions to each individual. If a user moves to a different
> organization, you simply move that user to a different group and they
> automatically receive the permissions that are needed for the new
> organization.
>
> You can select up to 10 AWS accounts at a time per permission set
> when you assign single sign-on access to users and groups. To assign
> more than 10 AWS accounts to the same set of users and groups, repeat
> this procedure as required for the additional accounts. When prompted,
> select the same users, groups, and permission set.

## S7 The confused deputy problem — AWS Identity and Access Management User Guide
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html
fetched: 2026-11-26
> The confused deputy problem is a security issue where an entity that doesn't have
> permission to perform an action can coerce a more-privileged entity to perform the action.
> One important aspect
> of this scenario is the external ID, an optional identifier that you
> can use in an IAM role trust policy to designate who can assume the role. The primary
> function of the external ID is to address and prevent the confused deputy problem.
>
> Example Corp can address the confused deputy problem by requiring that you include the
> ExternalId condition check in the role's trust policy. Example Corp
> generates a unique ExternalId value for each customer and uses that value
> in its request to assume the role. The ExternalId value must be unique
> among Example Corp's customers and controlled by Example Corp, not its customers. This
> is why you get it from Example Corp and you don't come up with it on your own. This
> prevents Example Corp from being a confused deputy and granting access to another
> account's AWS resources.
>
> The Condition element in this policy allows Example Corp to assume the role only when
> the AssumeRole API call includes the external ID value of 12345. Example Corp makes sure
> that whenever it assumes a role on behalf of a customer, it always includes that
> customer's external ID value in the AssumeRole call. Even if another customer supplies
> Example Corp with your ARN, it cannot control the external ID that Example Corp includes
> in its request to AWS. This helps prevent an unauthorized customer from gaining access
> to your resources.
