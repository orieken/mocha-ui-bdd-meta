import { Context, Done, HookFunction, Suite, SuiteFunction, Test, TestFunction } from "mocha";

declare module 'mocha-ui-bdd-meta' {
    export = MochaUiMeta;
}

declare function MochaUiMeta(suite: any): void;

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
    interface MetaHookFunction extends HookFunction {
        (fn: (this: MetaContext, done: Done) => void): void;
        (fn: (this: MetaContext, done: Done) => PromiseLike<any>): void;
        (name: string, fn?: (this: MetaContext, done: Done) => void): void;
        (name: string, fn?: (this: MetaContext, done: Done) => PromiseLike<any>): void;
    }

    interface MetaSuiteFunction extends SuiteFunction {
        (title: string, fn?: (this: MetaSuite) => void): MetaSuite;
        (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite;

        only: ExclusiveSuiteFunction
        skip: PendingSuiteFunction
    }

    interface MetaTestFunction extends TestFunction {
        (name: string, fn?: (this: MetaContext, done: Done) => void): MetaTest;
        (name: string, meta?: unknown, fn?: (this: MetaContext, done: Done) => void): MetaTest;

        only: ExclusiveTestFunction
        skip: PendingTestFunction
    }


    class MetaSuite extends Suite {
        meta?: unknown;
    }

    class MetaTest extends Test {
        meta?: unknown;
    }

    class MetaContext extends Context {
        override test?: MetaTest | undefined;
        meta?: unknown;
    }

    interface ExclusiveSuiteFunction {
        (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite;
        (title: string, meta?: unknown): Suite;
    }

    interface PendingSuiteFunction {
        (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite | void;
    }

    interface PendingTestFunction {
        (title: string, fn?: (this: MetaContext, done: Done) => void): Test;
    }

    interface ExclusiveTestFunction {
        (title: string, fn?: (this: MetaContext, done: Done) => void): Test;
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
