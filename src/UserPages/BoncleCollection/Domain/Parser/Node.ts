import { ExpandType } from "../../../../(System)/Types/Magic";

type node<Kind extends string, T> = ExpandType<{
    readonly kind: Kind;
} & T>;

type SetName = node<"SourceStmt", {
    readonly prefix: string;
    readonly name: string;
    readonly suffix: string;
}>;

type Decl = 
    | node<"GroupDecl", {
        readonly sharedTags: readonly string[];
        readonly inner: readonly Decl[];
    }>
    | node<"SetDecl", {
        readonly setNumber: string;
        readonly fullName: SetName;
        readonly tags: readonly string[];
    }>
;

type Stmt = 
    | node<"SourceStmt", {
        readonly url: string;
    }>
    | Decl
;

type Program = node<"Program", {
    readonly stmts: readonly Stmt[]
}>;

type Node = 
    | Program
    | Stmt
    | Decl
    | SetName
;

type NodeKind = Node["kind"];
