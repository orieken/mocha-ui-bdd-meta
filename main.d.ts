declare function MochaUiMeta(suite: any): void;

declare module 'mocha-ui-bdd-meta' {
    export = MochaUiMeta;
}

declare var beforeAll: MochaUiMeta.MetaHookFunction;
declare var beforeEach: MochaUiMeta.MetaHookFunction;
declare var describe: MochaUiMeta.MetaSuiteFunction;
declare var fdescribe: MochaUiMeta.MetaSuiteFunction;
declare var xdescribe: MochaUiMeta.MetaSuiteFunction;
declare var it: MochaUiMeta.MetaTestFunction;
declare var fit: MochaUiMeta.MetaTestFunction;
declare var xit: MochaUiMeta.MetaTestFunction;
declare var test: MochaUiMeta.MetaTestFunction;
declare var xtest: MochaUiMeta.MetaTestFunction;

declare namespace MochaUiMeta {
    type Done = (err?: any) => void;
    type Func = (this: MetaContext, done: Done) => void;
    type AsyncFunc = (this: MetaContext) => PromiseLike<any>;

    interface Error {
        name: string;
        message: string;
        stack?: string;
    }

    interface MetaHookFunction {
        (fn: Func): void;
        (fn: AsyncFunc): void;
        (name: string, fn?: Func): void;
        (name: string, fn?: AsyncFunc): void;
    }

    interface MetaSuiteFunction {
        (title: string, fn?: Func): MetaSuite;
        (title: string, fn?: AsyncFunc): MetaSuite;
        (title: string, meta?: unknown, fn?: Func): MetaSuite;
        (title: string, meta?: unknown, fn?: AsyncFunc): MetaSuite;

        only: MetaExclusiveSuiteFunction
        skip: MetaPendingSuiteFunction
    }

    interface MetaTestFunction {
        (fn: Func): MetaTest;
        (fn: AsyncFunc): MetaTest;
        (title: string, fn?: Func): MetaTest;
        (title: string, fn?: AsyncFunc): MetaTest;
        (name: string, meta?: unknown, fn?: Func): MetaTest;
        (name: string, meta?: unknown, fn?: AsyncFunc): MetaTest;

        retries(n: number): void;
        only: MetaExclusiveTestFunction
        skip: MetaPendingTestFunction
    }


    interface MetaSuite {
        (name: number | string | Function | FunctionLike, meta?: unknown, fn?: EmptyFunction): void;

        ctx: MetaContext;
        suites: MetaSuite[];
        tests: MetaTest[];
        pending: boolean;
        file?: string | undefined;
        root: boolean;
        delayed: boolean;
        parent: MetaSuite | undefined;
        title: string

        only: MetaSuite;
        skip: MetaSuite;
        meta?: unknown;
    }

    interface MetaTest {
        (name: string, meta?: unknown, fn?: Func): void;

        title: string;
        fn: Func | AsyncFunc | undefined;
        body: string;
        async: boolean;
        sync: boolean;
        timedOut: boolean;
        pending: boolean;
        duration?: number | undefined;
        parent?: MetaSuite | undefined;
        state?: "failed" | "passed" | undefined;
        timer?: any;
        ctx?: MetaContext | undefined;
        callback?: Done | undefined;
        allowUncaught?: boolean | undefined;
        file?: string | undefined;

        type: "test";
        speed?: "slow" | "medium" | "fast" | undefined; // added by reporters
        err?: Error | undefined; // added by reporters
        clone(): MetaTest;

        only: MetaTest;
        skip: MetaTest;
        meta?: unknown;
    }

    class MetaContext {
        override test?: MetaTest | undefined;
        meta?: unknown;
    }

    interface MetaExclusiveSuiteFunction {
        (title: string, meta?: unknown, fn?: Func): MetaSuite;
        (title: string, meta?: unknown, fn?: AsyncFunc): MetaSuite;
        (title: string, meta?: unknown): MetaSuite;
    }

    interface MetaPendingSuiteFunction {
        (title: string, meta?: unknown, fn?: Func): MetaSuite | void;
    }

    interface MetaPendingTestFunction {
        (title: string, fn?: (this: MetaContext, done: Done) => void): MetaTest;
    }

    interface MetaExclusiveTestFunction {
        (title: string, fn?: (this: MetaContext, done: Done) => void): MetaTest;
    }

}

// import { Context, Done, HookFunction, Suite, Test } from "mocha";
//
// declare function MochaUiMeta(suite: any): void;
//
// declare module 'mocha-ui-bdd-meta' {
//     export = MochaUiMeta;
// }
//
// declare var beforeAll: MochaUiMeta.MetaHookFunction;
// declare var beforeEach: MochaUiMeta.MetaHookFunction;
// declare var describe: MochaUiMeta.SuiteFunction;
// declare var fdescribe: MochaUiMeta.SuiteFunction;
// declare var xdescribe: MochaUiMeta.SuiteFunction;
// declare var it: MochaUiMeta.TestFunction;
// declare var fit: MochaUiMeta.TestFunction;
// declare var xit: MochaUiMeta.TestFunction;
// declare var test: MochaUiMeta.TestFunction;
// declare var xtest: MochaUiMeta.TestFunction;
//
// declare namespace MochaUiMeta {
//     interface SuiteFunction {
//         (title: string, fn?: (this: MetaSuite) => void): MetaSuite;
//
//         (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite;
//
//         only: ExclusiveSuiteFunction
//         skip: PendingSuiteFunction
//     }
//
//     interface MetaHookFunction extends HookFunction {
//         (fn: (this: MetaContext, done: Done) => void): void;
//
//         (fn: (this: MetaContext, done: Done) => PromiseLike<any>): void;
//
//         (name: string, fn?: (this: MetaContext, done: Done) => void): void;
//
//         (name: string, fn?: (this: MetaContext, done: Done) => PromiseLike<any>): void;
//     }
//
//     class MetaSuite extends Suite {
//         meta?: unknown;
//     }
//
//     class MetaTest extends Test {
//         meta?: unknown;
//     }
//
//     class MetaContext extends Context {
//         override test?: MetaTest | undefined;
//         meta?: unknown;
//     }
//
//     interface ExclusiveSuiteFunction {
//         (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite;
//
//         (title: string, meta?: unknown): Suite;
//     }
//
//     interface PendingSuiteFunction {
//         (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite | void;
//     }
//
//     interface PendingTestFunction {
//         (title: string, fn?: (this: MetaContext, done: Done) => void): Test;
//     }
//
//     interface ExclusiveTestFunction {
//         (title: string, fn?: (this: MetaContext, done: Done) => void): Test;
//     }
//
//     interface TestFunction {
//         (name: string, fn?: (this: MetaContext, done: Done) => void): MetaTest;
//
//         (name: string, meta?: unknown, fn?: (this: MetaContext, done: Done) => void): MetaTest;
//
//         only: ExclusiveTestFunction
//         skip: PendingTestFunction
//     }
// }
