import { SFNClient, StartExecutionCommand } from "@aws-sdk/client-sfn";
import dotenv from "dotenv";

dotenv.config();

const client = new SFNClient({ region: process.env.AWS_REGION });

export const startStepFunction = async (phoneNumber, message) => {
  const params = {
    stateMachineArn: process.env.STEPFN_ARN,
    input: JSON.stringify({ phoneNumber, message })
  };

  const command = new StartExecutionCommand(params);
  const response = await client.send(command);
  return response;
};