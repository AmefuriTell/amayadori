# C-0051 sources

## S1 Using Amazon CloudWatch dashboards — Using Amazon CloudWatch dashboards
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
fetched: 2026-11-25
> Amazon CloudWatch includes automatic pre-built dashboards and also enables you to create your own dashboards.
> Dashboards help you to monitor your resources in a single view, even those resources that are spread across different Regions.
> You can use CloudWatch dashboards to create customized views of the telemetry data for your AWS resources.
> If you have multiple AWS accounts, you can set up CloudWatch cross-account observability and then create rich cross-account dashboards in your monitoring accounts.
> You can seamlessly search, visualize, and analyze your metrics, logs, and traces without account boundaries.
> With CloudWatch cross-account observability, you can do the following in a dashboard in a monitoring account:
> Search, view, and create graphs of metrics that reside in source accounts. A single graph can include metrics from multiple accounts.
> Create alarms in the monitoring account that watch metrics in source accounts.
> View the log events from log groups located in source accounts, and run CloudWatch Logs Insights queries of log groups in source accounts.
> A single CloudWatch Logs Insights query in a monitoring account can query multiple log groups in multiple source accounts at once.

## S2 Using Amazon CloudWatch dashboards — Create a cross-account cross-Region dashboard programmatically
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#create_xaxr_dashboard_API
fetched: 2026-11-25
> You can use the AWS APIs and SDKs to create dashboards programmatically.
> To enable cross-account cross-Region dashboards, we have added new parameters to the dashboard body structure, as shown in the following table and examples.
> This example sets the accountId field to the ID of the sharing account at the widget level.
> This specifies that all metrics in this widget will come from that sharing account and Region.
> This example sets the accountId field differently at the level of each metric.
> In this example, the different metrics in this metric math expression come from different sharing accounts and different Regions.
> This example is for a CloudWatch Logs Insights widget.
> Another way to create dashboards programmatically is to first create one in the AWS Management Console, and then copy the JSON source of this dashboard.

## S3 Dashboard Body Structure and Syntax — Properties of a Log Widget Object
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Dashboard-Body-Structure.html#CloudWatch-Dashboard-Properties-Log-Widget-Object
fetched: 2026-11-25
> A widget of type log represents the results of a CloudWatch Logs Insights query.
> The account ID of the AWS account containing the logs, if this is a cross-account query.
> The query string starts with the names of the log groups that are to be queried.
> You must pre-pend each log group name with SOURCE.
> Separate multiple log groups with a pipe character (|).
> Add another pipe character after the list of log groups, and then specify the query syntax.
> Specify table to view the results as a table.
> If you omit this parameter, the results are displayed as a table.

## S4 CloudWatch cross-account observability — CloudWatch cross-account observability
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
fetched: 2026-11-25
> With Amazon CloudWatch cross-account observability, you can monitor and troubleshoot applications that span multiple accounts within a Region.
> A monitoring account is a central AWS account that can view and interact with observability data generated from source accounts.
> Source accounts share their observability data with the monitoring account.
> Metrics in Amazon CloudWatch. You can choose to share the metrics from all namespaces with the monitoring account, or filter to a subset of namespaces.
> Log groups in Amazon CloudWatch Logs. You can choose to share all log groups with the monitoring account, or filter to a subset of log groups.

## S5 Creating a CloudWatch cross-account cross-Region dashboard with the AWS Management Console — Creating a CloudWatch cross-account cross-Region dashboard with the AWS Management Console
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create_xaxr_dashboard.html#create_xaxr_dashboard
fetched: 2026-11-25
> You can create cross-account cross-Region dashboards, which summarize your CloudWatch data from multiple AWS accounts and multiple Regions into one dashboard.
> Before you can create a cross-account cross-Region dashboard, you must enable at least one sharing account and at least one monitoring account.
> As you create your dashboard, you can include widgets from multiple accounts and Regions.
> Widgets include graphs, alarms, and CloudWatch Logs Insights widgets.
