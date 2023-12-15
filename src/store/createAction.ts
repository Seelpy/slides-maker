export const createAction = <T>(type: string) => {
	const actionCreator = (payload: T) => ({ type, payload });
	actionCreator.type = type;
	actionCreator.actionInstance = {} as {type: string, payload: T}
	return actionCreator;
};