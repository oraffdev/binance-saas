import { Test, type TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ENV } from "../src/env";

// Mock the global ENV object
jest.mock("../src/env", () => ({
	ENV: {
		PORT: 3000,
	},
}));

describe("AppController", () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe("root", () => {
		it('should return "Hello World! running on port 3000"', () => {
			expect(appController.getHello()).toBe("Hello World! running on port 3000");
		});
	});
});
