import { Context, Done, HookFunction, Suite, Test } from "mocha";

declare function MochaUiMeta(suite: any): void;

declare module 'mocha-ui-bdd-meta' {
    export = MochaUiMeta;
}

declare var beforeAll: MetaHookFunction;
declare var beforeEach: MetaHookFunction;
declare var describe: SuiteFunction;
declare var fdescribe: SuiteFunction;
declare var xdescribe: SuiteFunction;
declare var it: TestFunction;
declare var fit: TestFunction;
declare var xit: TestFunction;
declare var test: TestFunction;
declare var xtest: TestFunction;

interface SuiteFunction {
    (title: string, fn?: (this: MetaSuite) => void): MetaSuite;
    (title: string, meta?: unknown, fn?: (this: MetaSuite) => void): MetaSuite;
    only: ExclusiveSuiteFunction
    skip: PendingSuiteFunction
}

interface MetaHookFunction extends HookFunction {
    (fn: (this: MetaContext, done: Done) => void): void;
    (fn: (this: MetaContext, done: Done) => PromiseLike<any>): void;
    (name: string, fn?: (this: MetaContext, done: Done) => void): void;
    (name: string, fn?: (this: MetaContext, done: Done) => PromiseLike<any>): void;
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
    (title: string, meta?: unknown,fn?: (this: MetaSuite) => void): MetaSuite;
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

interface TestFunction {
    (name: string, fn?: (this: MetaContext, done: Done) => void): MetaTest;
    (name: string, meta?: unknown, fn?: (this: MetaContext, done: Done) => void): MetaTest;
    only: ExclusiveTestFunction
    skip: PendingTestFunction
}
