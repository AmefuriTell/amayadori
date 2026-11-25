## S1 Build specification reference for CodeBuild — phases/*/finally
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases
fetched: 2026-11-26
> Optional block. Commands specified in a
> finally block are run after commands in the
> commands block. The commands in a finally block
> are run even if a command in the commands block fails. For
> example, if the commands block contains three commands and the
> first fails, CodeBuild skips the remaining two commands and runs any commands in the
> finally block. The phase is successful when all commands in the
> commands and the finally blocks run successfully.
> If any command in a phase fails, the phase fails.

## S2 Build specification reference for CodeBuild — phases/*/on-failure
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases
fetched: 2026-11-26
> Optional sequence. Specifies the action to take if a failure occurs during the
> phase. This can be one of the following values:
> ABORT - Abort the build.
> CONTINUE - Continue to the next phase.
> If this property is not specified, the failure process follows the transition
> phases as shown in Build phase transitions.
> The on-failure attribute is not supported when using Lambda compute or reserved capacity. This attribute only works with EC2 compute images provided by CodeBuild.

## S3 Build environment compute modes and types — About compute
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-compute-types.html#compute.types
fetched: 2026-11-26
> CodeBuild offers EC2 and AWS Lambda compute modes. EC2 offers optimized flexibility during your build and AWS Lambda
> offers optimized start-up speeds.
> With the EC2 compute mode, you can run your builds with on-demand or reserved capacity fleets.
> For on-demand fleets,
> you can select pre-defined compute types such as BUILD_GENERAL1_SMALL or
> BUILD_GENERAL1_LARGE.
> For reserved capacity fleets, you can select your compute configurations including vCPU, memory and disk space.
> After
> specifying the configurations, CodeBuild will choose a supported compute type that matches your requirements.

## S4 Run builds on AWS Lambda compute — Limitations of AWS Lambda compute
url: https://docs.aws.amazon.com/codebuild/latest/userguide/lambda.html#lambda.limitations
fetched: 2026-11-26
> AWS Lambda doesn't support caching, custom build timeouts, queue timeout, build badges, privileged mode, custom runtime environments, or runtimes longer than 15 minutes.
> AWS Lambda doesn't support Docker builds or runs.

## S5 Create a build project in AWS CodeBuild — timeoutInMinutes
url: https://docs.aws.amazon.com/codebuild/latest/userguide/create-project.html#cli.timeoutinminutes
fetched: 2026-11-26
> Optional. The number of minutes, between 5 to 2160 (36 hours), after which CodeBuild
> stops the build if it is not complete. If not specified, the default of 60 is used.

## S6 Create a build project in AWS CodeBuild — environment/privilegedMode
url: https://docs.aws.amazon.com/codebuild/latest/userguide/create-project.html#cli.environment
fetched: 2026-11-26
> Set to true only if you plan to use this build project to
> build Docker images. Otherwise, all associated builds that attempt to
> interact with the Docker daemon fail. You must also start the Docker
> daemon so that your builds can interact with it.
