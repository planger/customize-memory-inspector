import * as vscode from 'vscode';
import { DebugProtocol } from 'vscode-debugprotocol';

declare module 'MemoryInspector' {
  export interface AdapterCapabilities {
    getVariables?(session: vscode.DebugSession): Promise<VariableRange[]>;
    getResidents?(session: vscode.DebugSession, params: DebugProtocol.ReadMemoryArguments): Promise<VariableRange[]>;
    getAddressOfVariable?(session: vscode.DebugSession, variableName: string): Promise<string | undefined>;
    getSizeOfVariable?(session: vscode.DebugSession, variableName: string): Promise<bigint | undefined>;
    getMemoryDisplaySettings?(session: vscode.DebugSession): Promise<Partial<MemoryDisplaySettingsContribution>>;
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
  export interface MemoryDisplaySettings {
    bytesPerMau: number;
    mausPerGroup: number;
    groupsPerRow: string;
    endianness: string;
    scrollingBehavior: ScrollingBehavior;
    addressPadding: AddressPadding;
    addressRadix: Radix;
    showRadixPrefix: boolean;
    visibleColumns: string[]
  }
  export type ScrollingBehavior = 'Paginate' | 'Grow' | 'Auto-Append';
  export type AddressPadding = 'Min' | 0 | 32 | 64;
  export enum Radix {
    Binary = 2,
    Octal = 8,
    Decimal = 10,
    Hexadecimal = 16,
  }
  export interface MemoryDisplaySettingsContribution {
    message?: string;
    settings?: Partial<MemoryDisplaySettings>;
  }
}
