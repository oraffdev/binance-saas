import { Injectable } from "@nestjs/common";
import { ENV } from "./env";

@Injectable()
export class AppService {
	getHello(): string {
		return `Hello World! running on port ${ENV.PORT}`;
	}
}
