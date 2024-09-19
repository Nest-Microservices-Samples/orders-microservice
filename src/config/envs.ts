
import 'dotenv/config'; // Load environment variables from a .env file
import * as joi from 'joi'; // Import Joi for schema validation

// Define an interface for type safety
interface EnvVars {
    PORT: number;

    NATS_SERVERS: string[];
}

// Define the validation schema for environment variables
const envsSchema = joi.object({
    PORT: joi.number().required(), // PORT must be a number and is required

    NATS_SERVERS: joi.array().items( joi.string() ).required(), // NATS_SERVERS must be an array of strings and is required
})
.unknown(true); // Allow unknown environment variables

// Validate the environment variables against the schema
const { error, value } = envsSchema.validate({

    ...process.env, // Load environment variables
    NATS_SERVERS: process.env.NATS_SERVERS.split(','), // Split NATS_SERVERS by comma

});

// Throw an error if validation fails
if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`);
}

// Cast validated values to the EnvVars interface
const envVars: EnvVars = value;

// Export the validated and typed environment variables
export const envs = {
    port: envVars.PORT,

    natsServers: envVars.NATS_SERVERS,
}