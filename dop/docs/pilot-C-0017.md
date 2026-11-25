# 問題（5 問）

## q-1.4-0001（1 つ選ぶ）

A company deploys new versions of an AWS Lambda function by using AWS CodeDeploy. The operations team wants each release to first receive a small portion of production traffic. If no problems are found, all remaining traffic must move to the new version five minutes later. Which solution meets these requirements with the LEAST operational effort?

- **A.** Configure the deployment group to use the CodeDeployDefault.LambdaCanary10Percent5Minutes deployment configuration.
- **B.** Configure the deployment group to use the CodeDeployDefault.LambdaLinear10PercentEvery1Minute deployment configuration.
- **C.** Configure the deployment group to use the CodeDeployDefault.LambdaAllAtOnce configuration and monitor errors after release.
- **D.** Run a scheduled script that calls update-alias to change the alias routing weights every five minutes.

<details><summary>答えと解説</summary>

**答え: A**

LambdaCanary10Percent5Minutes は、最初に 10% の通信を新しい版へ移し、残りの 90% を 5 分後に移す決まった設定。要件の「少しだけ先に流し、5 分後に残り全部」にそのまま合い、作る物も無い。

- A: 正しい。最初に 10%、5 分後に残りの 90% を移す canary の設定。
- B: linear は 1 分ごとに 10% ずつ移すので、全部移るまで約 10 分かかり、「5 分後に残り全部」と合わない。
- C: 全部を一度に移すので、先に一部だけ流す要件に合わない。
- D: エイリアスの重みを自分で変えれば動くが、スクリプトを作って保守する手間がかかる。CodeDeploy の決まった設定で足りる。

> CodeDeployDefault.LambdaCanary10Percent5Minutes: Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.
>
> — https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html

</details>

## q-1.4-0002（1 つ選ぶ）

A company runs an Amazon ECS service behind a Network Load Balancer and deploys it with AWS CodeDeploy blue/green deployments. The company now wants to send 10% of production traffic to each new version for 5 minutes before shifting the rest. Which solution will meet this requirement with the LEAST operational effort?

- **A.** Create a custom canary deployment configuration in CodeDeploy and keep the Network Load Balancer.
- **B.** Switch the deployment group to CodeDeployDefault.ECSLinear10PercentEvery1Minutes and keep the Network Load Balancer.
- **C.** Keep CodeDeployDefault.ECSAllAtOnce and add a manual approval before each production deployment.
- **D.** Move the service to an Application Load Balancer and use CodeDeployDefault.ECSCanary10Percent5Minutes.

<details><summary>答えと解説</summary>

**答え: D**

ECS の CodeDeploy blue/green で Network Load Balancer を使うと、使える設定は ECSAllAtOnce だけ。canary で一部だけ流すには Application Load Balancer に替え、ECSCanary10Percent5Minutes を使う。

- A: Network Load Balancer では ECSAllAtOnce しか使えないので、独自の canary 設定も使えない。
- B: linear の設定も Network Load Balancer では使えない。また 1 分ごとに 10% ずつで、要件の形とも違う。
- C: 承認を挟んでも一度に全部を移すことは変わらず、一部だけ先に流す要件に合わない。
- D: 正しい。Application Load Balancer なら canary の決まった設定が使え、10% を 5 分流してから残りを移せる。

> When a Network Load Balancer is used, only the CodeDeployDefault.ECSAllAtOnce deployment configuration is supported.
>
> — https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html
> CodeDeployDefault.ECSCanary10Percent5Minutes: Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.
>
> — https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html

</details>

## q-1.4-0003（2 つ選ぶ）

A company uses AWS CodeDeploy blue/green deployments for an application on Amazon EC2 instances behind an Application Load Balancer. The QA team must test the replacement instances before they receive any production traffic, and the team will decide when to switch. After the switch, the original instances must stay running until the operations team decides to remove them. Which deployment group settings meet these requirements? (Choose TWO.)

- **A.** Select the traffic rerouting option "Reroute traffic immediately."
- **B.** Select the traffic rerouting option "I will choose whether to reroute traffic."
- **C.** Select "Terminate the original instances in the deployment group" with a one-hour wait period.
- **D.** Select "Keep the original instances in the deployment group running."
- **E.** Use an in-place deployment with the CodeDeployDefault.OneAtATime configuration.

<details><summary>答えと解説</summary>

**答え: B, D**

「I will choose whether to reroute traffic」にすると、置き換え先のインスタンスは手で切り替えるまでロードバランサーに登録されないので、本番の通信を受けずに試験できる。「Keep the original instances … running」にすると、切り替えた後も元のインスタンスが動き続ける。

- A: 用意ができしだい自動で登録されて本番の通信が流れるので、先に試験する要件に合わない。
- B: 正しい。手で切り替えるまで置き換え先は登録されない。
- C: 待つ時間の後に元のインスタンスが自動で終了する。運用チームが決めるまで残す要件に合わない。
- D: 正しい。切り替えた後も元のインスタンスを動かしたままにする。
- E: in-place は同じインスタンスを更新するので、置き換え先を先に試験できず、元の環境も残らない。

> Instances in the replacement environment are not registered with the specified load balancers and target groups unless you manually reroute traffic.
>
> — https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html
> the instances that were deregistered from the load balancers and target groups are kept running.
>
> — https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html

</details>

## q-1.4-0004（1 つ選ぶ）

A company runs a web application in an AWS Elastic Beanstalk environment. For each release, the company wants 10% of incoming traffic to go to the new version for 30 minutes. If the new instances stay healthy, all traffic must move to the new version and the old instances must be removed automatically. Which solution meets these requirements with the LEAST operational effort?

- **A.** Set the deployment policy to Immutable and set the health check wait time to 30 minutes.
- **B.** Set the deployment policy to TrafficSplitting with a 10% traffic split and a 30-minute evaluation time.
- **C.** Set the deployment policy to Rolling with additional batch and set the batch size to 10%.
- **D.** Create a second environment and use Amazon Route 53 weighted records to move traffic by hand.

<details><summary>答えと解説</summary>

**答え: B**

Traffic splitting は、新しいインスタンス一式を立ち上げ、決めた割合の通信を決めた時間だけ新しい版へ流し、問題が無ければ全部を移して古いインスタンスを終了する。割合（Traffic split）と時間（evaluation time）を設定するだけでよい。

- A: Immutable は新しいインスタンス一式を別の Auto Scaling グループで立ち上げるが、一部の通信だけを一定時間流す仕組みではない。
- B: 正しい。割合と評価の時間を決めるだけで canary の形になり、古いインスタンスも自動で終了する。
- C: バッチごとに順にインスタンスを入れ替える方式で、通信の 10% を 30 分流してから判断する形にはならない。
- D: 動くが、環境を 2 つ持ち、重みを手で変える手間がかかる。

> It then forwards a specified percentage of incoming client traffic to the new application version for a specified evaluation period.
>
> — https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html
> If the new instances stay healthy, Elastic Beanstalk forwards all traffic to them and terminates the old ones.
>
> — https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html

</details>

## q-1.4-0005（1 つ選ぶ）

A company updates an application in an AWS Elastic Beanstalk environment by using in-place updates, and users see brief outages during releases. The company wants to test each new version at its own URL before release, switch users to it instantly, and be able to switch back quickly. Which solution meets these requirements with the LEAST operational effort?

- **A.** Change the deployment policy to Rolling and reduce the batch size to one instance.
- **B.** Change the deployment policy to Immutable for all future application releases.
- **C.** Deploy the new version to a separate environment and use Swap environment URLs.
- **D.** Deploy to a separate environment and terminate the old environment right after switching DNS.

<details><summary>答えと解説</summary>

**答え: C**

Elastic Beanstalk の blue/green は、新しい版を別の環境に置き、2 つの環境の CNAME を入れ替える（Swap environment URLs）。入れ替える前に新しい環境の URL で試験でき、入れ替えはすぐ効き、もう一度入れ替えれば戻せる。

- A: 同じ環境の中でインスタンスを順に更新するので、新しい版を別の URL で先に試験できない。
- B: Immutable は止まらずに更新できるが、同じ環境の中の更新なので、別の URL で先に試験して入れ替える形にはならない。
- C: 正しい。別の環境で試験してから CNAME を入れ替え、戻すときも入れ替えるだけ。
- D: DNS の変更が行き渡り古い記録が切れるまで、古い環境は終了してはいけない。すぐ終了すると戻せない。

> deploy the new version to a separate environment, and then swap the CNAMEs of the two environments to redirect traffic to the new version instantly.
>
> — https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html
> do not terminate your old environment until the DNS changes are propagated and your old DNS records expire.
>
> — https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html

</details>
