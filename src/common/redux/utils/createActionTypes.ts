type ActionTypes<T extends string> = Record<T, string>;

const createActionTypes = <T extends string>(reducerName: string, types: T[]): ActionTypes<T> => {
	const createActionType = (name: T): string => `${reducerName}/${name}`;
	const actionTypes: ActionTypes<T> = {} as ActionTypes<T>;
	types.forEach(type => {
		actionTypes[type] = createActionType(type);
	});
	return actionTypes;
};

export default createActionTypes;
