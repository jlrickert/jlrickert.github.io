import * as React from "react";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;

type MapDiscriminatedUnion<T extends Record<K, string>, K extends keyof T> = {
	[V in T[K]]: DiscriminateUnion<T, K, V>;
};
type MapActionRecord<State, T extends Record<any, any>> = {
	[K in keyof T]: (action: T[K]) => (state: State) => State;
};

export type ActionRecord<State, Action extends { ["type"]: string }> = MapActionRecord<
	State,
	MapDiscriminatedUnion<Action, "type">
>;

export const createActionMap: <State, Action extends { ["type"]: string }>(
	actionMap: ActionRecord<State, Action>
) => (action: Action) => (state: State) => State = (actionMap) => (action) =>
	//@ts-ignore
	actionMap[action.type](action);

/**
 * Tag is the html tag used. Things such as div, a, input, etc.
 */
export type Tag = keyof React.ReactHTML;

/**
 * TagProps is the props associated with a tag
 */
export type TagProps<T extends Tag> = React.ReactHTML[T] extends React.DetailedHTMLFactory<
	infer Props,
	any
>
	? Props
	: never;

/**
 * TagElement is the element associated with a tag
 */
export type TagElement<T extends Tag> = React.ReactHTML[T] extends React.DetailedHTMLFactory<
	any,
	infer Type
>
	? Type
	: never;

export type TagC<T extends Tag = "div", P = {}> = React.FC<TagProps<T> & P>;
export type FC<P = {}> = React.FC<P>;

/**
 * cn concatenates class names together and strips out undefined or false values
 *
 * @param classNameList
 * @returns
 */
export const cn: (
	...classNameList: (string | undefined | false | O.Option<string> | E.Either<unknown, string>)[]
) => string = (...classNameList) =>
	classNameList
		.reduce((acc, _cn) => {
			if (typeof _cn === "string") {
				acc.push(_cn);
				return acc;
			} else if (_cn === false) {
				return acc;
			} else if (_cn === undefined) {
				return acc;
			} else if (_cn._tag === "Some") {
				acc.push(_cn.value);
				return acc;
			} else if (_cn._tag === "Right") {
				acc.push(_cn.right);
				return acc;
			}
			return acc;
		}, [] as string[])
		.join(" ");
