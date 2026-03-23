const cdk = require('aws-cdk-lib');
const { Construct } = require('constructs');
const stepfunctions = require('aws-cdk-lib/aws-stepfunctions');
const iam = require('aws-cdk-lib/aws-iam');

class InfrastructureStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const publishSms = new stepfunctions.CustomState(this, 'PublishSMS', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::sns:publish',
        Parameters: {
          'Message.$': '$.message',
          'PhoneNumber.$': '$.phoneNumber'
        },
        End: true
      }
    });

    const stateMachine = new stepfunctions.StateMachine(this, 'Task4StateMachine', {
      stateMachineName: 'task4-state-machine',
      definition: publishSms
    });

    stateMachine.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['sns:Publish'],
        resources: ['*']
      })
    );

    new cdk.CfnOutput(this, 'StateMachineArn', {
      value: stateMachine.stateMachineArn,
    });
  }
}

module.exports = { InfrastructureStack };