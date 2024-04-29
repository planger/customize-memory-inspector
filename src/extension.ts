// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { AdapterCapabilities, AdapterRegistry, MemoryDisplaySettingsContribution, VariableRange } from 'MemoryInspector';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "customize-memory-inspector" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('customize-memory-inspector.helloWorld', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage('Hello World from customize-memory-inspector!');
		})
	);

	const memoryInspectorApi = vscode.extensions.getExtension('eclipse-cdt.memory-inspector');
	if (!memoryInspectorApi) {
		console.error('Memory Inspector API not found');
		return;
	}

	const api: AdapterRegistry | undefined = await memoryInspectorApi.activate();
	if (!api) {
		console.error('Memory Inspector API is not available');
		return;
	}

	context.subscriptions.push(
		api.registerAdapter(new MyPseudoVariableTracker(), 'arm-debugger')
	);
}

export function deactivate() { }


export class MyPseudoVariableTracker implements AdapterCapabilities {
	async getVariables(session: vscode.DebugSession): Promise<VariableRange[]> {
		return [{
			startAddress: '0x00000000',
			endAddress: '0x00000001',
			name: 'variableName',
			type: 'variableType',
			value: 'variableValue'
		}];
	}
	async getMemoryDisplaySettings(session: vscode.DebugSession): Promise<Partial<MemoryDisplaySettingsContribution>> {
		return {
			message: 'Hello from MyPseudoVariableTracker',
			settings: {
				bytesPerMau: 8,
				mausPerGroup: 4,
				endianness: 'Big Endian',
				addressPadding: 64,
				visibleColumns: ['ascii']
			}
		};
	}
}