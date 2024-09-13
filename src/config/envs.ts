
import 'dotenv/config'; // Load environment variables from a .env file
import * as joi from 'joi'; // Import Joi for schema validation

// Define an interface for type safety
interface EnvVars {
    PORT: number;
}

// Define the validation schema for environment variables
const envsSchema = joi.object({
    PORT: joi.number().required() // PORT must be a number and is required
})
.unknown(true); // Allow unknown environment variables

// Validate the environment variables against the schema
const { error, value } = envsSchema.validate( process.env );

// Throw an error if validation fails
if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`);
}

// Cast validated values to the EnvVars interface
const envVars: EnvVars = value;

// Export the validated and typed environment variables
export const envs = {
    port: envVars.PORT,
}