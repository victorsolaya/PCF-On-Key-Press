import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IOnKeyPress } from './IOnKeyPressProps'
import { OnKeyPressCode } from './OnKeyPress'
export class OnKeyPress implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	// Reference to ComponentFramework Context object
	private _context: ComponentFramework.Context<IInputs>;
	// reference to the notifyOutputChanged method
	private _notifyOutputChanged: () => void;
	// reference to the container div
	private _container: HTMLDivElement;
	private _value: string;

	private props: IOnKeyPress = {
		isControlDisabled: false,
		isControlVisible: false,
		userInputChanged: this.userInputChanged.bind(this),
		inputValue: "",
	}
	/**
	 * Empty constructor.
	 */
	constructor() { }

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public async init(
		context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary,
		container: HTMLDivElement) {

		this._context = context;
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this.props.inputValue = this._context.parameters.field.raw || "";
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view
		this.props.isControlDisabled = context.mode.isControlDisabled;
		this.props.isControlVisible = context.mode.isVisible;
		var visible = context.mode.isVisible
		ReactDOM.render(
			React.createElement(
				OnKeyPressCode,
				this.props
			)
			,
			this._container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {
			field: this._value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container);
	}

	private userInputChanged(newValue: string) {
		this._value = newValue;
		this._notifyOutputChanged();
	}
}