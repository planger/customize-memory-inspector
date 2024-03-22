import * as vscode from 'vscode';
import { DebugProtocol } from 'vscode-debugprotocol';

declare module 'MemoryInspector' {
  export interface AdapterCapabilities {
    getVariables?(session: vscode.DebugSession): Promise<VariableRange[]>;
    getResidents?(session: vscode.DebugSession, params: DebugProtocol.ReadMemoryArguments): Promise<VariableRange[]>;
    getAddressOfVariable?(session: vscode.DebugSession, variableName: string): Promise<string | undefined>;
    getSizeOfVariable?(session: vscode.DebugSession, variableName: string): Promise<bigint | undefined>;
    initializeAdapterTracker?(session: vscode.DebugSession): vscode.DebugAdapterTracker | undefined;
  }
  export interface MemoryRange {
    startAddress: string;
    endAddress?: string;
  }
  export interface VariableMetadata {
    name: string;
    type?: string;
    value?: string;
  }
  export interface VariableRange extends MemoryRange, VariableMetadata { }
  export interface AdapterRegistry extends vscode.Disposable {
    registerAdapter(handlerToRegister: AdapterCapabilities, ...debugTypes: string[]): vscode.Disposable;
  }
}
