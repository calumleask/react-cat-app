type ActionTypes = Record<string, string>;

const createActionTypes = (reducerName: string, types: string[]): ActionTypes => {
	const createActionType = (name: string): string => `${reducerName}/${name}`;
	const actionTypes: ActionTypes = {};
	types.forEach(type => {
		actionTypes[type] = createActionType(type);
	});
	return actionTypes;
};

export default createActionTypes;
