
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model ThreadComment
 * 
 */
export type ThreadComment = $Result.DefaultSelection<Prisma.$ThreadCommentPayload>
/**
 * Model GlobalSettings
 * 
 */
export type GlobalSettings = $Result.DefaultSelection<Prisma.$GlobalSettingsPayload>
/**
 * Model JarNote
 * 
 */
export type JarNote = $Result.DefaultSelection<Prisma.$JarNotePayload>
/**
 * Model LoveNote
 * 
 */
export type LoveNote = $Result.DefaultSelection<Prisma.$LoveNotePayload>
/**
 * Model Milestone
 * 
 */
export type Milestone = $Result.DefaultSelection<Prisma.$MilestonePayload>
/**
 * Model LoginHistory
 * 
 */
export type LoginHistory = $Result.DefaultSelection<Prisma.$LoginHistoryPayload>
/**
 * Model Image
 * 
 */
export type Image = $Result.DefaultSelection<Prisma.$ImagePayload>
/**
 * Model ChatActivity
 * 
 */
export type ChatActivity = $Result.DefaultSelection<Prisma.$ChatActivityPayload>
/**
 * Model PlaylistSong
 * 
 */
export type PlaylistSong = $Result.DefaultSelection<Prisma.$PlaylistSongPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model ActivityComment
 * 
 */
export type ActivityComment = $Result.DefaultSelection<Prisma.$ActivityCommentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ApiKeys
 * const apiKeys = await prisma.apiKey.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ApiKeys
   * const apiKeys = await prisma.apiKey.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.threadComment`: Exposes CRUD operations for the **ThreadComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ThreadComments
    * const threadComments = await prisma.threadComment.findMany()
    * ```
    */
  get threadComment(): Prisma.ThreadCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.globalSettings`: Exposes CRUD operations for the **GlobalSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalSettings
    * const globalSettings = await prisma.globalSettings.findMany()
    * ```
    */
  get globalSettings(): Prisma.GlobalSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jarNote`: Exposes CRUD operations for the **JarNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JarNotes
    * const jarNotes = await prisma.jarNote.findMany()
    * ```
    */
  get jarNote(): Prisma.JarNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loveNote`: Exposes CRUD operations for the **LoveNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoveNotes
    * const loveNotes = await prisma.loveNote.findMany()
    * ```
    */
  get loveNote(): Prisma.LoveNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.milestone`: Exposes CRUD operations for the **Milestone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Milestones
    * const milestones = await prisma.milestone.findMany()
    * ```
    */
  get milestone(): Prisma.MilestoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loginHistory`: Exposes CRUD operations for the **LoginHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoginHistories
    * const loginHistories = await prisma.loginHistory.findMany()
    * ```
    */
  get loginHistory(): Prisma.LoginHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatActivity`: Exposes CRUD operations for the **ChatActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatActivities
    * const chatActivities = await prisma.chatActivity.findMany()
    * ```
    */
  get chatActivity(): Prisma.ChatActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playlistSong`: Exposes CRUD operations for the **PlaylistSong** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlaylistSongs
    * const playlistSongs = await prisma.playlistSong.findMany()
    * ```
    */
  get playlistSong(): Prisma.PlaylistSongDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityComment`: Exposes CRUD operations for the **ActivityComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityComments
    * const activityComments = await prisma.activityComment.findMany()
    * ```
    */
  get activityComment(): Prisma.ActivityCommentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ApiKey: 'ApiKey',
    Profile: 'Profile',
    Message: 'Message',
    ThreadComment: 'ThreadComment',
    GlobalSettings: 'GlobalSettings',
    JarNote: 'JarNote',
    LoveNote: 'LoveNote',
    Milestone: 'Milestone',
    LoginHistory: 'LoginHistory',
    Image: 'Image',
    ChatActivity: 'ChatActivity',
    PlaylistSong: 'PlaylistSong',
    Activity: 'Activity',
    ActivityComment: 'ActivityComment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "apiKey" | "profile" | "message" | "threadComment" | "globalSettings" | "jarNote" | "loveNote" | "milestone" | "loginHistory" | "image" | "chatActivity" | "playlistSong" | "activity" | "activityComment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      ThreadComment: {
        payload: Prisma.$ThreadCommentPayload<ExtArgs>
        fields: Prisma.ThreadCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThreadCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThreadCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>
          }
          findFirst: {
            args: Prisma.ThreadCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThreadCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>
          }
          findMany: {
            args: Prisma.ThreadCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>[]
          }
          create: {
            args: Prisma.ThreadCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>
          }
          createMany: {
            args: Prisma.ThreadCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThreadCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>[]
          }
          delete: {
            args: Prisma.ThreadCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>
          }
          update: {
            args: Prisma.ThreadCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>
          }
          deleteMany: {
            args: Prisma.ThreadCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThreadCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThreadCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>[]
          }
          upsert: {
            args: Prisma.ThreadCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadCommentPayload>
          }
          aggregate: {
            args: Prisma.ThreadCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThreadComment>
          }
          groupBy: {
            args: Prisma.ThreadCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThreadCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThreadCommentCountArgs<ExtArgs>
            result: $Utils.Optional<ThreadCommentCountAggregateOutputType> | number
          }
        }
      }
      GlobalSettings: {
        payload: Prisma.$GlobalSettingsPayload<ExtArgs>
        fields: Prisma.GlobalSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findFirst: {
            args: Prisma.GlobalSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findMany: {
            args: Prisma.GlobalSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          create: {
            args: Prisma.GlobalSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          createMany: {
            args: Prisma.GlobalSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          delete: {
            args: Prisma.GlobalSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          update: {
            args: Prisma.GlobalSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GlobalSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          upsert: {
            args: Prisma.GlobalSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          aggregate: {
            args: Prisma.GlobalSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalSettings>
          }
          groupBy: {
            args: Prisma.GlobalSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsCountAggregateOutputType> | number
          }
        }
      }
      JarNote: {
        payload: Prisma.$JarNotePayload<ExtArgs>
        fields: Prisma.JarNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JarNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JarNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>
          }
          findFirst: {
            args: Prisma.JarNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JarNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>
          }
          findMany: {
            args: Prisma.JarNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>[]
          }
          create: {
            args: Prisma.JarNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>
          }
          createMany: {
            args: Prisma.JarNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JarNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>[]
          }
          delete: {
            args: Prisma.JarNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>
          }
          update: {
            args: Prisma.JarNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>
          }
          deleteMany: {
            args: Prisma.JarNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JarNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JarNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>[]
          }
          upsert: {
            args: Prisma.JarNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JarNotePayload>
          }
          aggregate: {
            args: Prisma.JarNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJarNote>
          }
          groupBy: {
            args: Prisma.JarNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<JarNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.JarNoteCountArgs<ExtArgs>
            result: $Utils.Optional<JarNoteCountAggregateOutputType> | number
          }
        }
      }
      LoveNote: {
        payload: Prisma.$LoveNotePayload<ExtArgs>
        fields: Prisma.LoveNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoveNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoveNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>
          }
          findFirst: {
            args: Prisma.LoveNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoveNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>
          }
          findMany: {
            args: Prisma.LoveNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>[]
          }
          create: {
            args: Prisma.LoveNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>
          }
          createMany: {
            args: Prisma.LoveNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoveNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>[]
          }
          delete: {
            args: Prisma.LoveNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>
          }
          update: {
            args: Prisma.LoveNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>
          }
          deleteMany: {
            args: Prisma.LoveNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoveNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoveNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>[]
          }
          upsert: {
            args: Prisma.LoveNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoveNotePayload>
          }
          aggregate: {
            args: Prisma.LoveNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoveNote>
          }
          groupBy: {
            args: Prisma.LoveNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoveNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoveNoteCountArgs<ExtArgs>
            result: $Utils.Optional<LoveNoteCountAggregateOutputType> | number
          }
        }
      }
      Milestone: {
        payload: Prisma.$MilestonePayload<ExtArgs>
        fields: Prisma.MilestoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MilestoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MilestoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findFirst: {
            args: Prisma.MilestoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MilestoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findMany: {
            args: Prisma.MilestoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          create: {
            args: Prisma.MilestoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          createMany: {
            args: Prisma.MilestoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MilestoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          delete: {
            args: Prisma.MilestoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          update: {
            args: Prisma.MilestoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          deleteMany: {
            args: Prisma.MilestoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MilestoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MilestoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          upsert: {
            args: Prisma.MilestoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          aggregate: {
            args: Prisma.MilestoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMilestone>
          }
          groupBy: {
            args: Prisma.MilestoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<MilestoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.MilestoneCountArgs<ExtArgs>
            result: $Utils.Optional<MilestoneCountAggregateOutputType> | number
          }
        }
      }
      LoginHistory: {
        payload: Prisma.$LoginHistoryPayload<ExtArgs>
        fields: Prisma.LoginHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoginHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoginHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>
          }
          findFirst: {
            args: Prisma.LoginHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoginHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>
          }
          findMany: {
            args: Prisma.LoginHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>[]
          }
          create: {
            args: Prisma.LoginHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>
          }
          createMany: {
            args: Prisma.LoginHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoginHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>[]
          }
          delete: {
            args: Prisma.LoginHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>
          }
          update: {
            args: Prisma.LoginHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>
          }
          deleteMany: {
            args: Prisma.LoginHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoginHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoginHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>[]
          }
          upsert: {
            args: Prisma.LoginHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginHistoryPayload>
          }
          aggregate: {
            args: Prisma.LoginHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoginHistory>
          }
          groupBy: {
            args: Prisma.LoginHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoginHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoginHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<LoginHistoryCountAggregateOutputType> | number
          }
        }
      }
      Image: {
        payload: Prisma.$ImagePayload<ExtArgs>
        fields: Prisma.ImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findFirst: {
            args: Prisma.ImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findMany: {
            args: Prisma.ImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          create: {
            args: Prisma.ImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          createMany: {
            args: Prisma.ImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          delete: {
            args: Prisma.ImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          update: {
            args: Prisma.ImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          deleteMany: {
            args: Prisma.ImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          upsert: {
            args: Prisma.ImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.ImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      ChatActivity: {
        payload: Prisma.$ChatActivityPayload<ExtArgs>
        fields: Prisma.ChatActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>
          }
          findFirst: {
            args: Prisma.ChatActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>
          }
          findMany: {
            args: Prisma.ChatActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>[]
          }
          create: {
            args: Prisma.ChatActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>
          }
          createMany: {
            args: Prisma.ChatActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>[]
          }
          delete: {
            args: Prisma.ChatActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>
          }
          update: {
            args: Prisma.ChatActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>
          }
          deleteMany: {
            args: Prisma.ChatActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>[]
          }
          upsert: {
            args: Prisma.ChatActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatActivityPayload>
          }
          aggregate: {
            args: Prisma.ChatActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatActivity>
          }
          groupBy: {
            args: Prisma.ChatActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ChatActivityCountAggregateOutputType> | number
          }
        }
      }
      PlaylistSong: {
        payload: Prisma.$PlaylistSongPayload<ExtArgs>
        fields: Prisma.PlaylistSongFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistSongFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistSongFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>
          }
          findFirst: {
            args: Prisma.PlaylistSongFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistSongFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>
          }
          findMany: {
            args: Prisma.PlaylistSongFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>[]
          }
          create: {
            args: Prisma.PlaylistSongCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>
          }
          createMany: {
            args: Prisma.PlaylistSongCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaylistSongCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>[]
          }
          delete: {
            args: Prisma.PlaylistSongDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>
          }
          update: {
            args: Prisma.PlaylistSongUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistSongDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistSongUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaylistSongUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>[]
          }
          upsert: {
            args: Prisma.PlaylistSongUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistSongPayload>
          }
          aggregate: {
            args: Prisma.PlaylistSongAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylistSong>
          }
          groupBy: {
            args: Prisma.PlaylistSongGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistSongGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistSongCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistSongCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      ActivityComment: {
        payload: Prisma.$ActivityCommentPayload<ExtArgs>
        fields: Prisma.ActivityCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>
          }
          findFirst: {
            args: Prisma.ActivityCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>
          }
          findMany: {
            args: Prisma.ActivityCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>[]
          }
          create: {
            args: Prisma.ActivityCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>
          }
          createMany: {
            args: Prisma.ActivityCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>[]
          }
          delete: {
            args: Prisma.ActivityCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>
          }
          update: {
            args: Prisma.ActivityCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>
          }
          deleteMany: {
            args: Prisma.ActivityCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>[]
          }
          upsert: {
            args: Prisma.ActivityCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCommentPayload>
          }
          aggregate: {
            args: Prisma.ActivityCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityComment>
          }
          groupBy: {
            args: Prisma.ActivityCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCommentCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCommentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    apiKey?: ApiKeyOmit
    profile?: ProfileOmit
    message?: MessageOmit
    threadComment?: ThreadCommentOmit
    globalSettings?: GlobalSettingsOmit
    jarNote?: JarNoteOmit
    loveNote?: LoveNoteOmit
    milestone?: MilestoneOmit
    loginHistory?: LoginHistoryOmit
    image?: ImageOmit
    chatActivity?: ChatActivityOmit
    playlistSong?: PlaylistSongOmit
    activity?: ActivityOmit
    activityComment?: ActivityCommentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ActivityCountOutputType
   */

  export type ActivityCountOutputType = {
    comments: number
  }

  export type ActivityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ActivityCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCountOutputType
     */
    select?: ActivityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _avg: ApiKeyAvgAggregateOutputType | null
    _sum: ApiKeySumAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyAvgAggregateOutputType = {
    usage: number | null
  }

  export type ApiKeySumAggregateOutputType = {
    usage: number | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    key: string | null
    status: string | null
    usage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    key: string | null
    status: string | null
    usage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    key: number
    status: number
    usage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyAvgAggregateInputType = {
    usage?: true
  }

  export type ApiKeySumAggregateInputType = {
    usage?: true
  }

  export type ApiKeyMinAggregateInputType = {
    id?: true
    key?: true
    status?: true
    usage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    key?: true
    status?: true
    usage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    key?: true
    status?: true
    usage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApiKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApiKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _avg?: ApiKeyAvgAggregateInputType
    _sum?: ApiKeySumAggregateInputType
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    key: string
    status: string
    usage: number
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _avg: ApiKeyAvgAggregateOutputType | null
    _sum: ApiKeySumAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    status?: boolean
    usage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    status?: boolean
    usage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    status?: boolean
    usage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    key?: boolean
    status?: boolean
    usage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "status" | "usage" | "createdAt" | "updatedAt", ExtArgs["result"]["apiKey"]>

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      status: string
      usage: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly key: FieldRef<"ApiKey", 'String'>
    readonly status: FieldRef<"ApiKey", 'String'>
    readonly usage: FieldRef<"ApiKey", 'Int'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type ProfileSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    role: string | null
    name: string | null
    email: string | null
    avatarUrl: string | null
    mood: string | null
    moodUpdatedAt: Date | null
    latitude: number | null
    longitude: number | null
    trackName: string | null
    trackArtist: string | null
    trackImage: string | null
    isPlaying: boolean | null
    ourSongUrl: string | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    role: string | null
    name: string | null
    email: string | null
    avatarUrl: string | null
    mood: string | null
    moodUpdatedAt: Date | null
    latitude: number | null
    longitude: number | null
    trackName: string | null
    trackArtist: string | null
    trackImage: string | null
    isPlaying: boolean | null
    ourSongUrl: string | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    role: number
    name: number
    email: number
    avatarUrl: number
    mood: number
    moodUpdatedAt: number
    latitude: number
    longitude: number
    trackName: number
    trackArtist: number
    trackImage: number
    isPlaying: number
    ourSongUrl: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type ProfileSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    avatarUrl?: true
    mood?: true
    moodUpdatedAt?: true
    latitude?: true
    longitude?: true
    trackName?: true
    trackArtist?: true
    trackImage?: true
    isPlaying?: true
    ourSongUrl?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    avatarUrl?: true
    mood?: true
    moodUpdatedAt?: true
    latitude?: true
    longitude?: true
    trackName?: true
    trackArtist?: true
    trackImage?: true
    isPlaying?: true
    ourSongUrl?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    avatarUrl?: true
    mood?: true
    moodUpdatedAt?: true
    latitude?: true
    longitude?: true
    trackName?: true
    trackArtist?: true
    trackImage?: true
    isPlaying?: true
    ourSongUrl?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    role: string
    name: string
    email: string | null
    avatarUrl: string | null
    mood: string | null
    moodUpdatedAt: Date | null
    latitude: number | null
    longitude: number | null
    trackName: string | null
    trackArtist: string | null
    trackImage: string | null
    isPlaying: boolean
    ourSongUrl: string | null
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    avatarUrl?: boolean
    mood?: boolean
    moodUpdatedAt?: boolean
    latitude?: boolean
    longitude?: boolean
    trackName?: boolean
    trackArtist?: boolean
    trackImage?: boolean
    isPlaying?: boolean
    ourSongUrl?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    avatarUrl?: boolean
    mood?: boolean
    moodUpdatedAt?: boolean
    latitude?: boolean
    longitude?: boolean
    trackName?: boolean
    trackArtist?: boolean
    trackImage?: boolean
    isPlaying?: boolean
    ourSongUrl?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    avatarUrl?: boolean
    mood?: boolean
    moodUpdatedAt?: boolean
    latitude?: boolean
    longitude?: boolean
    trackName?: boolean
    trackArtist?: boolean
    trackImage?: boolean
    isPlaying?: boolean
    ourSongUrl?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    avatarUrl?: boolean
    mood?: boolean
    moodUpdatedAt?: boolean
    latitude?: boolean
    longitude?: boolean
    trackName?: boolean
    trackArtist?: boolean
    trackImage?: boolean
    isPlaying?: boolean
    ourSongUrl?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "name" | "email" | "avatarUrl" | "mood" | "moodUpdatedAt" | "latitude" | "longitude" | "trackName" | "trackArtist" | "trackImage" | "isPlaying" | "ourSongUrl" | "updatedAt", ExtArgs["result"]["profile"]>

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: string
      name: string
      email: string | null
      avatarUrl: string | null
      mood: string | null
      moodUpdatedAt: Date | null
      latitude: number | null
      longitude: number | null
      trackName: string | null
      trackArtist: string | null
      trackImage: string | null
      isPlaying: boolean
      ourSongUrl: string | null
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'String'>
    readonly name: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly mood: FieldRef<"Profile", 'String'>
    readonly moodUpdatedAt: FieldRef<"Profile", 'DateTime'>
    readonly latitude: FieldRef<"Profile", 'Float'>
    readonly longitude: FieldRef<"Profile", 'Float'>
    readonly trackName: FieldRef<"Profile", 'String'>
    readonly trackArtist: FieldRef<"Profile", 'String'>
    readonly trackImage: FieldRef<"Profile", 'String'>
    readonly isPlaying: FieldRef<"Profile", 'Boolean'>
    readonly ourSongUrl: FieldRef<"Profile", 'String'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    text: string | null
    translation: string | null
    hindiTranslation: string | null
    sender: string | null
    receiver: string | null
    chatKey: string | null
    status: string | null
    type: string | null
    imageUrl: string | null
    audioUrl: string | null
    unlockAt: Date | null
    isPinned: boolean | null
    parentId: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    text: string | null
    translation: string | null
    hindiTranslation: string | null
    sender: string | null
    receiver: string | null
    chatKey: string | null
    status: string | null
    type: string | null
    imageUrl: string | null
    audioUrl: string | null
    unlockAt: Date | null
    isPinned: boolean | null
    parentId: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    text: number
    translation: number
    hindiTranslation: number
    sender: number
    receiver: number
    chatKey: number
    status: number
    type: number
    wordBreakdown: number
    imageUrl: number
    audioUrl: number
    unlockAt: number
    isPinned: number
    parentId: number
    reactions: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    text?: true
    translation?: true
    hindiTranslation?: true
    sender?: true
    receiver?: true
    chatKey?: true
    status?: true
    type?: true
    imageUrl?: true
    audioUrl?: true
    unlockAt?: true
    isPinned?: true
    parentId?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    text?: true
    translation?: true
    hindiTranslation?: true
    sender?: true
    receiver?: true
    chatKey?: true
    status?: true
    type?: true
    imageUrl?: true
    audioUrl?: true
    unlockAt?: true
    isPinned?: true
    parentId?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    text?: true
    translation?: true
    hindiTranslation?: true
    sender?: true
    receiver?: true
    chatKey?: true
    status?: true
    type?: true
    wordBreakdown?: true
    imageUrl?: true
    audioUrl?: true
    unlockAt?: true
    isPinned?: true
    parentId?: true
    reactions?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    text: string
    translation: string | null
    hindiTranslation: string | null
    sender: string
    receiver: string
    chatKey: string
    status: string
    type: string
    wordBreakdown: JsonValue | null
    imageUrl: string | null
    audioUrl: string | null
    unlockAt: Date | null
    isPinned: boolean
    parentId: string | null
    reactions: JsonValue | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    translation?: boolean
    hindiTranslation?: boolean
    sender?: boolean
    receiver?: boolean
    chatKey?: boolean
    status?: boolean
    type?: boolean
    wordBreakdown?: boolean
    imageUrl?: boolean
    audioUrl?: boolean
    unlockAt?: boolean
    isPinned?: boolean
    parentId?: boolean
    reactions?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    translation?: boolean
    hindiTranslation?: boolean
    sender?: boolean
    receiver?: boolean
    chatKey?: boolean
    status?: boolean
    type?: boolean
    wordBreakdown?: boolean
    imageUrl?: boolean
    audioUrl?: boolean
    unlockAt?: boolean
    isPinned?: boolean
    parentId?: boolean
    reactions?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    translation?: boolean
    hindiTranslation?: boolean
    sender?: boolean
    receiver?: boolean
    chatKey?: boolean
    status?: boolean
    type?: boolean
    wordBreakdown?: boolean
    imageUrl?: boolean
    audioUrl?: boolean
    unlockAt?: boolean
    isPinned?: boolean
    parentId?: boolean
    reactions?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    text?: boolean
    translation?: boolean
    hindiTranslation?: boolean
    sender?: boolean
    receiver?: boolean
    chatKey?: boolean
    status?: boolean
    type?: boolean
    wordBreakdown?: boolean
    imageUrl?: boolean
    audioUrl?: boolean
    unlockAt?: boolean
    isPinned?: boolean
    parentId?: boolean
    reactions?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "translation" | "hindiTranslation" | "sender" | "receiver" | "chatKey" | "status" | "type" | "wordBreakdown" | "imageUrl" | "audioUrl" | "unlockAt" | "isPinned" | "parentId" | "reactions" | "createdAt", ExtArgs["result"]["message"]>

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      translation: string | null
      hindiTranslation: string | null
      sender: string
      receiver: string
      chatKey: string
      status: string
      type: string
      wordBreakdown: Prisma.JsonValue | null
      imageUrl: string | null
      audioUrl: string | null
      unlockAt: Date | null
      isPinned: boolean
      parentId: string | null
      reactions: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly text: FieldRef<"Message", 'String'>
    readonly translation: FieldRef<"Message", 'String'>
    readonly hindiTranslation: FieldRef<"Message", 'String'>
    readonly sender: FieldRef<"Message", 'String'>
    readonly receiver: FieldRef<"Message", 'String'>
    readonly chatKey: FieldRef<"Message", 'String'>
    readonly status: FieldRef<"Message", 'String'>
    readonly type: FieldRef<"Message", 'String'>
    readonly wordBreakdown: FieldRef<"Message", 'Json'>
    readonly imageUrl: FieldRef<"Message", 'String'>
    readonly audioUrl: FieldRef<"Message", 'String'>
    readonly unlockAt: FieldRef<"Message", 'DateTime'>
    readonly isPinned: FieldRef<"Message", 'Boolean'>
    readonly parentId: FieldRef<"Message", 'String'>
    readonly reactions: FieldRef<"Message", 'Json'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
  }


  /**
   * Model ThreadComment
   */

  export type AggregateThreadComment = {
    _count: ThreadCommentCountAggregateOutputType | null
    _min: ThreadCommentMinAggregateOutputType | null
    _max: ThreadCommentMaxAggregateOutputType | null
  }

  export type ThreadCommentMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    content: string | null
    author: string | null
    createdAt: Date | null
  }

  export type ThreadCommentMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    content: string | null
    author: string | null
    createdAt: Date | null
  }

  export type ThreadCommentCountAggregateOutputType = {
    id: number
    messageId: number
    content: number
    author: number
    createdAt: number
    _all: number
  }


  export type ThreadCommentMinAggregateInputType = {
    id?: true
    messageId?: true
    content?: true
    author?: true
    createdAt?: true
  }

  export type ThreadCommentMaxAggregateInputType = {
    id?: true
    messageId?: true
    content?: true
    author?: true
    createdAt?: true
  }

  export type ThreadCommentCountAggregateInputType = {
    id?: true
    messageId?: true
    content?: true
    author?: true
    createdAt?: true
    _all?: true
  }

  export type ThreadCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ThreadComment to aggregate.
     */
    where?: ThreadCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThreadComments to fetch.
     */
    orderBy?: ThreadCommentOrderByWithRelationInput | ThreadCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThreadCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThreadComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThreadComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ThreadComments
    **/
    _count?: true | ThreadCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThreadCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThreadCommentMaxAggregateInputType
  }

  export type GetThreadCommentAggregateType<T extends ThreadCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateThreadComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThreadComment[P]>
      : GetScalarType<T[P], AggregateThreadComment[P]>
  }




  export type ThreadCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadCommentWhereInput
    orderBy?: ThreadCommentOrderByWithAggregationInput | ThreadCommentOrderByWithAggregationInput[]
    by: ThreadCommentScalarFieldEnum[] | ThreadCommentScalarFieldEnum
    having?: ThreadCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThreadCommentCountAggregateInputType | true
    _min?: ThreadCommentMinAggregateInputType
    _max?: ThreadCommentMaxAggregateInputType
  }

  export type ThreadCommentGroupByOutputType = {
    id: string
    messageId: string
    content: string
    author: string
    createdAt: Date
    _count: ThreadCommentCountAggregateOutputType | null
    _min: ThreadCommentMinAggregateOutputType | null
    _max: ThreadCommentMaxAggregateOutputType | null
  }

  type GetThreadCommentGroupByPayload<T extends ThreadCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThreadCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThreadCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThreadCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ThreadCommentGroupByOutputType[P]>
        }
      >
    >


  export type ThreadCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["threadComment"]>

  export type ThreadCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["threadComment"]>

  export type ThreadCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["threadComment"]>

  export type ThreadCommentSelectScalar = {
    id?: boolean
    messageId?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }

  export type ThreadCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "content" | "author" | "createdAt", ExtArgs["result"]["threadComment"]>

  export type $ThreadCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ThreadComment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      content: string
      author: string
      createdAt: Date
    }, ExtArgs["result"]["threadComment"]>
    composites: {}
  }

  type ThreadCommentGetPayload<S extends boolean | null | undefined | ThreadCommentDefaultArgs> = $Result.GetResult<Prisma.$ThreadCommentPayload, S>

  type ThreadCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThreadCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThreadCommentCountAggregateInputType | true
    }

  export interface ThreadCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ThreadComment'], meta: { name: 'ThreadComment' } }
    /**
     * Find zero or one ThreadComment that matches the filter.
     * @param {ThreadCommentFindUniqueArgs} args - Arguments to find a ThreadComment
     * @example
     * // Get one ThreadComment
     * const threadComment = await prisma.threadComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThreadCommentFindUniqueArgs>(args: SelectSubset<T, ThreadCommentFindUniqueArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ThreadComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThreadCommentFindUniqueOrThrowArgs} args - Arguments to find a ThreadComment
     * @example
     * // Get one ThreadComment
     * const threadComment = await prisma.threadComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThreadCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, ThreadCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ThreadComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentFindFirstArgs} args - Arguments to find a ThreadComment
     * @example
     * // Get one ThreadComment
     * const threadComment = await prisma.threadComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThreadCommentFindFirstArgs>(args?: SelectSubset<T, ThreadCommentFindFirstArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ThreadComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentFindFirstOrThrowArgs} args - Arguments to find a ThreadComment
     * @example
     * // Get one ThreadComment
     * const threadComment = await prisma.threadComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThreadCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, ThreadCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ThreadComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ThreadComments
     * const threadComments = await prisma.threadComment.findMany()
     * 
     * // Get first 10 ThreadComments
     * const threadComments = await prisma.threadComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const threadCommentWithIdOnly = await prisma.threadComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThreadCommentFindManyArgs>(args?: SelectSubset<T, ThreadCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ThreadComment.
     * @param {ThreadCommentCreateArgs} args - Arguments to create a ThreadComment.
     * @example
     * // Create one ThreadComment
     * const ThreadComment = await prisma.threadComment.create({
     *   data: {
     *     // ... data to create a ThreadComment
     *   }
     * })
     * 
     */
    create<T extends ThreadCommentCreateArgs>(args: SelectSubset<T, ThreadCommentCreateArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ThreadComments.
     * @param {ThreadCommentCreateManyArgs} args - Arguments to create many ThreadComments.
     * @example
     * // Create many ThreadComments
     * const threadComment = await prisma.threadComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThreadCommentCreateManyArgs>(args?: SelectSubset<T, ThreadCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ThreadComments and returns the data saved in the database.
     * @param {ThreadCommentCreateManyAndReturnArgs} args - Arguments to create many ThreadComments.
     * @example
     * // Create many ThreadComments
     * const threadComment = await prisma.threadComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ThreadComments and only return the `id`
     * const threadCommentWithIdOnly = await prisma.threadComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThreadCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, ThreadCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ThreadComment.
     * @param {ThreadCommentDeleteArgs} args - Arguments to delete one ThreadComment.
     * @example
     * // Delete one ThreadComment
     * const ThreadComment = await prisma.threadComment.delete({
     *   where: {
     *     // ... filter to delete one ThreadComment
     *   }
     * })
     * 
     */
    delete<T extends ThreadCommentDeleteArgs>(args: SelectSubset<T, ThreadCommentDeleteArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ThreadComment.
     * @param {ThreadCommentUpdateArgs} args - Arguments to update one ThreadComment.
     * @example
     * // Update one ThreadComment
     * const threadComment = await prisma.threadComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThreadCommentUpdateArgs>(args: SelectSubset<T, ThreadCommentUpdateArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ThreadComments.
     * @param {ThreadCommentDeleteManyArgs} args - Arguments to filter ThreadComments to delete.
     * @example
     * // Delete a few ThreadComments
     * const { count } = await prisma.threadComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThreadCommentDeleteManyArgs>(args?: SelectSubset<T, ThreadCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ThreadComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ThreadComments
     * const threadComment = await prisma.threadComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThreadCommentUpdateManyArgs>(args: SelectSubset<T, ThreadCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ThreadComments and returns the data updated in the database.
     * @param {ThreadCommentUpdateManyAndReturnArgs} args - Arguments to update many ThreadComments.
     * @example
     * // Update many ThreadComments
     * const threadComment = await prisma.threadComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ThreadComments and only return the `id`
     * const threadCommentWithIdOnly = await prisma.threadComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThreadCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, ThreadCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ThreadComment.
     * @param {ThreadCommentUpsertArgs} args - Arguments to update or create a ThreadComment.
     * @example
     * // Update or create a ThreadComment
     * const threadComment = await prisma.threadComment.upsert({
     *   create: {
     *     // ... data to create a ThreadComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ThreadComment we want to update
     *   }
     * })
     */
    upsert<T extends ThreadCommentUpsertArgs>(args: SelectSubset<T, ThreadCommentUpsertArgs<ExtArgs>>): Prisma__ThreadCommentClient<$Result.GetResult<Prisma.$ThreadCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ThreadComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentCountArgs} args - Arguments to filter ThreadComments to count.
     * @example
     * // Count the number of ThreadComments
     * const count = await prisma.threadComment.count({
     *   where: {
     *     // ... the filter for the ThreadComments we want to count
     *   }
     * })
    **/
    count<T extends ThreadCommentCountArgs>(
      args?: Subset<T, ThreadCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThreadCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ThreadComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThreadCommentAggregateArgs>(args: Subset<T, ThreadCommentAggregateArgs>): Prisma.PrismaPromise<GetThreadCommentAggregateType<T>>

    /**
     * Group by ThreadComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThreadCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThreadCommentGroupByArgs['orderBy'] }
        : { orderBy?: ThreadCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThreadCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThreadCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ThreadComment model
   */
  readonly fields: ThreadCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ThreadComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThreadCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ThreadComment model
   */
  interface ThreadCommentFieldRefs {
    readonly id: FieldRef<"ThreadComment", 'String'>
    readonly messageId: FieldRef<"ThreadComment", 'String'>
    readonly content: FieldRef<"ThreadComment", 'String'>
    readonly author: FieldRef<"ThreadComment", 'String'>
    readonly createdAt: FieldRef<"ThreadComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ThreadComment findUnique
   */
  export type ThreadCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * Filter, which ThreadComment to fetch.
     */
    where: ThreadCommentWhereUniqueInput
  }

  /**
   * ThreadComment findUniqueOrThrow
   */
  export type ThreadCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * Filter, which ThreadComment to fetch.
     */
    where: ThreadCommentWhereUniqueInput
  }

  /**
   * ThreadComment findFirst
   */
  export type ThreadCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * Filter, which ThreadComment to fetch.
     */
    where?: ThreadCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThreadComments to fetch.
     */
    orderBy?: ThreadCommentOrderByWithRelationInput | ThreadCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ThreadComments.
     */
    cursor?: ThreadCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThreadComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThreadComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ThreadComments.
     */
    distinct?: ThreadCommentScalarFieldEnum | ThreadCommentScalarFieldEnum[]
  }

  /**
   * ThreadComment findFirstOrThrow
   */
  export type ThreadCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * Filter, which ThreadComment to fetch.
     */
    where?: ThreadCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThreadComments to fetch.
     */
    orderBy?: ThreadCommentOrderByWithRelationInput | ThreadCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ThreadComments.
     */
    cursor?: ThreadCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThreadComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThreadComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ThreadComments.
     */
    distinct?: ThreadCommentScalarFieldEnum | ThreadCommentScalarFieldEnum[]
  }

  /**
   * ThreadComment findMany
   */
  export type ThreadCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * Filter, which ThreadComments to fetch.
     */
    where?: ThreadCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ThreadComments to fetch.
     */
    orderBy?: ThreadCommentOrderByWithRelationInput | ThreadCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ThreadComments.
     */
    cursor?: ThreadCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ThreadComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ThreadComments.
     */
    skip?: number
    distinct?: ThreadCommentScalarFieldEnum | ThreadCommentScalarFieldEnum[]
  }

  /**
   * ThreadComment create
   */
  export type ThreadCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * The data needed to create a ThreadComment.
     */
    data: XOR<ThreadCommentCreateInput, ThreadCommentUncheckedCreateInput>
  }

  /**
   * ThreadComment createMany
   */
  export type ThreadCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ThreadComments.
     */
    data: ThreadCommentCreateManyInput | ThreadCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ThreadComment createManyAndReturn
   */
  export type ThreadCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * The data used to create many ThreadComments.
     */
    data: ThreadCommentCreateManyInput | ThreadCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ThreadComment update
   */
  export type ThreadCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * The data needed to update a ThreadComment.
     */
    data: XOR<ThreadCommentUpdateInput, ThreadCommentUncheckedUpdateInput>
    /**
     * Choose, which ThreadComment to update.
     */
    where: ThreadCommentWhereUniqueInput
  }

  /**
   * ThreadComment updateMany
   */
  export type ThreadCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ThreadComments.
     */
    data: XOR<ThreadCommentUpdateManyMutationInput, ThreadCommentUncheckedUpdateManyInput>
    /**
     * Filter which ThreadComments to update
     */
    where?: ThreadCommentWhereInput
    /**
     * Limit how many ThreadComments to update.
     */
    limit?: number
  }

  /**
   * ThreadComment updateManyAndReturn
   */
  export type ThreadCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * The data used to update ThreadComments.
     */
    data: XOR<ThreadCommentUpdateManyMutationInput, ThreadCommentUncheckedUpdateManyInput>
    /**
     * Filter which ThreadComments to update
     */
    where?: ThreadCommentWhereInput
    /**
     * Limit how many ThreadComments to update.
     */
    limit?: number
  }

  /**
   * ThreadComment upsert
   */
  export type ThreadCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * The filter to search for the ThreadComment to update in case it exists.
     */
    where: ThreadCommentWhereUniqueInput
    /**
     * In case the ThreadComment found by the `where` argument doesn't exist, create a new ThreadComment with this data.
     */
    create: XOR<ThreadCommentCreateInput, ThreadCommentUncheckedCreateInput>
    /**
     * In case the ThreadComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThreadCommentUpdateInput, ThreadCommentUncheckedUpdateInput>
  }

  /**
   * ThreadComment delete
   */
  export type ThreadCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
    /**
     * Filter which ThreadComment to delete.
     */
    where: ThreadCommentWhereUniqueInput
  }

  /**
   * ThreadComment deleteMany
   */
  export type ThreadCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ThreadComments to delete
     */
    where?: ThreadCommentWhereInput
    /**
     * Limit how many ThreadComments to delete.
     */
    limit?: number
  }

  /**
   * ThreadComment without action
   */
  export type ThreadCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadComment
     */
    select?: ThreadCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ThreadComment
     */
    omit?: ThreadCommentOmit<ExtArgs> | null
  }


  /**
   * Model GlobalSettings
   */

  export type AggregateGlobalSettings = {
    _count: GlobalSettingsCountAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  export type GlobalSettingsMinAggregateOutputType = {
    id: string | null
    stopEffects: boolean | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type GlobalSettingsMaxAggregateOutputType = {
    id: string | null
    stopEffects: boolean | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type GlobalSettingsCountAggregateOutputType = {
    id: number
    stopEffects: number
    updatedBy: number
    updatedAt: number
    _all: number
  }


  export type GlobalSettingsMinAggregateInputType = {
    id?: true
    stopEffects?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type GlobalSettingsMaxAggregateInputType = {
    id?: true
    stopEffects?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type GlobalSettingsCountAggregateInputType = {
    id?: true
    stopEffects?: true
    updatedBy?: true
    updatedAt?: true
    _all?: true
  }

  export type GlobalSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to aggregate.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalSettings
    **/
    _count?: true | GlobalSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GetGlobalSettingsAggregateType<T extends GlobalSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalSettings[P]>
      : GetScalarType<T[P], AggregateGlobalSettings[P]>
  }




  export type GlobalSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalSettingsWhereInput
    orderBy?: GlobalSettingsOrderByWithAggregationInput | GlobalSettingsOrderByWithAggregationInput[]
    by: GlobalSettingsScalarFieldEnum[] | GlobalSettingsScalarFieldEnum
    having?: GlobalSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalSettingsCountAggregateInputType | true
    _min?: GlobalSettingsMinAggregateInputType
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GlobalSettingsGroupByOutputType = {
    id: string
    stopEffects: boolean
    updatedBy: string | null
    updatedAt: Date
    _count: GlobalSettingsCountAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  type GetGlobalSettingsGroupByPayload<T extends GlobalSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GlobalSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopEffects?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopEffects?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stopEffects?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectScalar = {
    id?: boolean
    stopEffects?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }

  export type GlobalSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stopEffects" | "updatedBy" | "updatedAt", ExtArgs["result"]["globalSettings"]>

  export type $GlobalSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stopEffects: boolean
      updatedBy: string | null
      updatedAt: Date
    }, ExtArgs["result"]["globalSettings"]>
    composites: {}
  }

  type GlobalSettingsGetPayload<S extends boolean | null | undefined | GlobalSettingsDefaultArgs> = $Result.GetResult<Prisma.$GlobalSettingsPayload, S>

  type GlobalSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GlobalSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GlobalSettingsCountAggregateInputType | true
    }

  export interface GlobalSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalSettings'], meta: { name: 'GlobalSettings' } }
    /**
     * Find zero or one GlobalSettings that matches the filter.
     * @param {GlobalSettingsFindUniqueArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalSettingsFindUniqueArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GlobalSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GlobalSettingsFindUniqueOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalSettingsFindFirstArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany()
     * 
     * // Get first 10 GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalSettingsFindManyArgs>(args?: SelectSubset<T, GlobalSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GlobalSettings.
     * @param {GlobalSettingsCreateArgs} args - Arguments to create a GlobalSettings.
     * @example
     * // Create one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.create({
     *   data: {
     *     // ... data to create a GlobalSettings
     *   }
     * })
     * 
     */
    create<T extends GlobalSettingsCreateArgs>(args: SelectSubset<T, GlobalSettingsCreateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GlobalSettings.
     * @param {GlobalSettingsCreateManyArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalSettingsCreateManyArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalSettings and returns the data saved in the database.
     * @param {GlobalSettingsCreateManyAndReturnArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GlobalSettings.
     * @param {GlobalSettingsDeleteArgs} args - Arguments to delete one GlobalSettings.
     * @example
     * // Delete one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.delete({
     *   where: {
     *     // ... filter to delete one GlobalSettings
     *   }
     * })
     * 
     */
    delete<T extends GlobalSettingsDeleteArgs>(args: SelectSubset<T, GlobalSettingsDeleteArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GlobalSettings.
     * @param {GlobalSettingsUpdateArgs} args - Arguments to update one GlobalSettings.
     * @example
     * // Update one GlobalSettings
     * const globalSettings = await prisma.globalSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalSettingsUpdateArgs>(args: SelectSubset<T, GlobalSettingsUpdateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GlobalSettings.
     * @param {GlobalSettingsDeleteManyArgs} args - Arguments to filter GlobalSettings to delete.
     * @example
     * // Delete a few GlobalSettings
     * const { count } = await prisma.globalSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalSettingsDeleteManyArgs>(args?: SelectSubset<T, GlobalSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalSettingsUpdateManyArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings and returns the data updated in the database.
     * @param {GlobalSettingsUpdateManyAndReturnArgs} args - Arguments to update many GlobalSettings.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GlobalSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GlobalSettings.
     * @param {GlobalSettingsUpsertArgs} args - Arguments to update or create a GlobalSettings.
     * @example
     * // Update or create a GlobalSettings
     * const globalSettings = await prisma.globalSettings.upsert({
     *   create: {
     *     // ... data to create a GlobalSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalSettings we want to update
     *   }
     * })
     */
    upsert<T extends GlobalSettingsUpsertArgs>(args: SelectSubset<T, GlobalSettingsUpsertArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsCountArgs} args - Arguments to filter GlobalSettings to count.
     * @example
     * // Count the number of GlobalSettings
     * const count = await prisma.globalSettings.count({
     *   where: {
     *     // ... the filter for the GlobalSettings we want to count
     *   }
     * })
    **/
    count<T extends GlobalSettingsCountArgs>(
      args?: Subset<T, GlobalSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalSettingsAggregateArgs>(args: Subset<T, GlobalSettingsAggregateArgs>): Prisma.PrismaPromise<GetGlobalSettingsAggregateType<T>>

    /**
     * Group by GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GlobalSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalSettings model
   */
  readonly fields: GlobalSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalSettings model
   */
  interface GlobalSettingsFieldRefs {
    readonly id: FieldRef<"GlobalSettings", 'String'>
    readonly stopEffects: FieldRef<"GlobalSettings", 'Boolean'>
    readonly updatedBy: FieldRef<"GlobalSettings", 'String'>
    readonly updatedAt: FieldRef<"GlobalSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalSettings findUnique
   */
  export type GlobalSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findUniqueOrThrow
   */
  export type GlobalSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findFirst
   */
  export type GlobalSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findFirstOrThrow
   */
  export type GlobalSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findMany
   */
  export type GlobalSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings create
   */
  export type GlobalSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a GlobalSettings.
     */
    data: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
  }

  /**
   * GlobalSettings createMany
   */
  export type GlobalSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings createManyAndReturn
   */
  export type GlobalSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings update
   */
  export type GlobalSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
    /**
     * Choose, which GlobalSettings to update.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings updateMany
   */
  export type GlobalSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings updateManyAndReturn
   */
  export type GlobalSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings upsert
   */
  export type GlobalSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the GlobalSettings to update in case it exists.
     */
    where: GlobalSettingsWhereUniqueInput
    /**
     * In case the GlobalSettings found by the `where` argument doesn't exist, create a new GlobalSettings with this data.
     */
    create: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
    /**
     * In case the GlobalSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
  }

  /**
   * GlobalSettings delete
   */
  export type GlobalSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter which GlobalSettings to delete.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings deleteMany
   */
  export type GlobalSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to delete
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to delete.
     */
    limit?: number
  }

  /**
   * GlobalSettings without action
   */
  export type GlobalSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
  }


  /**
   * Model JarNote
   */

  export type AggregateJarNote = {
    _count: JarNoteCountAggregateOutputType | null
    _min: JarNoteMinAggregateOutputType | null
    _max: JarNoteMaxAggregateOutputType | null
  }

  export type JarNoteMinAggregateOutputType = {
    id: string | null
    content: string | null
    author: string | null
    createdAt: Date | null
  }

  export type JarNoteMaxAggregateOutputType = {
    id: string | null
    content: string | null
    author: string | null
    createdAt: Date | null
  }

  export type JarNoteCountAggregateOutputType = {
    id: number
    content: number
    author: number
    createdAt: number
    _all: number
  }


  export type JarNoteMinAggregateInputType = {
    id?: true
    content?: true
    author?: true
    createdAt?: true
  }

  export type JarNoteMaxAggregateInputType = {
    id?: true
    content?: true
    author?: true
    createdAt?: true
  }

  export type JarNoteCountAggregateInputType = {
    id?: true
    content?: true
    author?: true
    createdAt?: true
    _all?: true
  }

  export type JarNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JarNote to aggregate.
     */
    where?: JarNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JarNotes to fetch.
     */
    orderBy?: JarNoteOrderByWithRelationInput | JarNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JarNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JarNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JarNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JarNotes
    **/
    _count?: true | JarNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JarNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JarNoteMaxAggregateInputType
  }

  export type GetJarNoteAggregateType<T extends JarNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateJarNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJarNote[P]>
      : GetScalarType<T[P], AggregateJarNote[P]>
  }




  export type JarNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JarNoteWhereInput
    orderBy?: JarNoteOrderByWithAggregationInput | JarNoteOrderByWithAggregationInput[]
    by: JarNoteScalarFieldEnum[] | JarNoteScalarFieldEnum
    having?: JarNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JarNoteCountAggregateInputType | true
    _min?: JarNoteMinAggregateInputType
    _max?: JarNoteMaxAggregateInputType
  }

  export type JarNoteGroupByOutputType = {
    id: string
    content: string
    author: string
    createdAt: Date
    _count: JarNoteCountAggregateOutputType | null
    _min: JarNoteMinAggregateOutputType | null
    _max: JarNoteMaxAggregateOutputType | null
  }

  type GetJarNoteGroupByPayload<T extends JarNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JarNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JarNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JarNoteGroupByOutputType[P]>
            : GetScalarType<T[P], JarNoteGroupByOutputType[P]>
        }
      >
    >


  export type JarNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["jarNote"]>

  export type JarNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["jarNote"]>

  export type JarNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["jarNote"]>

  export type JarNoteSelectScalar = {
    id?: boolean
    content?: boolean
    author?: boolean
    createdAt?: boolean
  }

  export type JarNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "author" | "createdAt", ExtArgs["result"]["jarNote"]>

  export type $JarNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JarNote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      author: string
      createdAt: Date
    }, ExtArgs["result"]["jarNote"]>
    composites: {}
  }

  type JarNoteGetPayload<S extends boolean | null | undefined | JarNoteDefaultArgs> = $Result.GetResult<Prisma.$JarNotePayload, S>

  type JarNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JarNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JarNoteCountAggregateInputType | true
    }

  export interface JarNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JarNote'], meta: { name: 'JarNote' } }
    /**
     * Find zero or one JarNote that matches the filter.
     * @param {JarNoteFindUniqueArgs} args - Arguments to find a JarNote
     * @example
     * // Get one JarNote
     * const jarNote = await prisma.jarNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JarNoteFindUniqueArgs>(args: SelectSubset<T, JarNoteFindUniqueArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JarNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JarNoteFindUniqueOrThrowArgs} args - Arguments to find a JarNote
     * @example
     * // Get one JarNote
     * const jarNote = await prisma.jarNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JarNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, JarNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JarNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteFindFirstArgs} args - Arguments to find a JarNote
     * @example
     * // Get one JarNote
     * const jarNote = await prisma.jarNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JarNoteFindFirstArgs>(args?: SelectSubset<T, JarNoteFindFirstArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JarNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteFindFirstOrThrowArgs} args - Arguments to find a JarNote
     * @example
     * // Get one JarNote
     * const jarNote = await prisma.jarNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JarNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, JarNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JarNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JarNotes
     * const jarNotes = await prisma.jarNote.findMany()
     * 
     * // Get first 10 JarNotes
     * const jarNotes = await prisma.jarNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jarNoteWithIdOnly = await prisma.jarNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JarNoteFindManyArgs>(args?: SelectSubset<T, JarNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JarNote.
     * @param {JarNoteCreateArgs} args - Arguments to create a JarNote.
     * @example
     * // Create one JarNote
     * const JarNote = await prisma.jarNote.create({
     *   data: {
     *     // ... data to create a JarNote
     *   }
     * })
     * 
     */
    create<T extends JarNoteCreateArgs>(args: SelectSubset<T, JarNoteCreateArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JarNotes.
     * @param {JarNoteCreateManyArgs} args - Arguments to create many JarNotes.
     * @example
     * // Create many JarNotes
     * const jarNote = await prisma.jarNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JarNoteCreateManyArgs>(args?: SelectSubset<T, JarNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JarNotes and returns the data saved in the database.
     * @param {JarNoteCreateManyAndReturnArgs} args - Arguments to create many JarNotes.
     * @example
     * // Create many JarNotes
     * const jarNote = await prisma.jarNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JarNotes and only return the `id`
     * const jarNoteWithIdOnly = await prisma.jarNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JarNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, JarNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JarNote.
     * @param {JarNoteDeleteArgs} args - Arguments to delete one JarNote.
     * @example
     * // Delete one JarNote
     * const JarNote = await prisma.jarNote.delete({
     *   where: {
     *     // ... filter to delete one JarNote
     *   }
     * })
     * 
     */
    delete<T extends JarNoteDeleteArgs>(args: SelectSubset<T, JarNoteDeleteArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JarNote.
     * @param {JarNoteUpdateArgs} args - Arguments to update one JarNote.
     * @example
     * // Update one JarNote
     * const jarNote = await prisma.jarNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JarNoteUpdateArgs>(args: SelectSubset<T, JarNoteUpdateArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JarNotes.
     * @param {JarNoteDeleteManyArgs} args - Arguments to filter JarNotes to delete.
     * @example
     * // Delete a few JarNotes
     * const { count } = await prisma.jarNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JarNoteDeleteManyArgs>(args?: SelectSubset<T, JarNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JarNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JarNotes
     * const jarNote = await prisma.jarNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JarNoteUpdateManyArgs>(args: SelectSubset<T, JarNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JarNotes and returns the data updated in the database.
     * @param {JarNoteUpdateManyAndReturnArgs} args - Arguments to update many JarNotes.
     * @example
     * // Update many JarNotes
     * const jarNote = await prisma.jarNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JarNotes and only return the `id`
     * const jarNoteWithIdOnly = await prisma.jarNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JarNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, JarNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JarNote.
     * @param {JarNoteUpsertArgs} args - Arguments to update or create a JarNote.
     * @example
     * // Update or create a JarNote
     * const jarNote = await prisma.jarNote.upsert({
     *   create: {
     *     // ... data to create a JarNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JarNote we want to update
     *   }
     * })
     */
    upsert<T extends JarNoteUpsertArgs>(args: SelectSubset<T, JarNoteUpsertArgs<ExtArgs>>): Prisma__JarNoteClient<$Result.GetResult<Prisma.$JarNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JarNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteCountArgs} args - Arguments to filter JarNotes to count.
     * @example
     * // Count the number of JarNotes
     * const count = await prisma.jarNote.count({
     *   where: {
     *     // ... the filter for the JarNotes we want to count
     *   }
     * })
    **/
    count<T extends JarNoteCountArgs>(
      args?: Subset<T, JarNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JarNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JarNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JarNoteAggregateArgs>(args: Subset<T, JarNoteAggregateArgs>): Prisma.PrismaPromise<GetJarNoteAggregateType<T>>

    /**
     * Group by JarNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JarNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JarNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JarNoteGroupByArgs['orderBy'] }
        : { orderBy?: JarNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JarNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJarNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JarNote model
   */
  readonly fields: JarNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JarNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JarNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JarNote model
   */
  interface JarNoteFieldRefs {
    readonly id: FieldRef<"JarNote", 'String'>
    readonly content: FieldRef<"JarNote", 'String'>
    readonly author: FieldRef<"JarNote", 'String'>
    readonly createdAt: FieldRef<"JarNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JarNote findUnique
   */
  export type JarNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * Filter, which JarNote to fetch.
     */
    where: JarNoteWhereUniqueInput
  }

  /**
   * JarNote findUniqueOrThrow
   */
  export type JarNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * Filter, which JarNote to fetch.
     */
    where: JarNoteWhereUniqueInput
  }

  /**
   * JarNote findFirst
   */
  export type JarNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * Filter, which JarNote to fetch.
     */
    where?: JarNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JarNotes to fetch.
     */
    orderBy?: JarNoteOrderByWithRelationInput | JarNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JarNotes.
     */
    cursor?: JarNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JarNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JarNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JarNotes.
     */
    distinct?: JarNoteScalarFieldEnum | JarNoteScalarFieldEnum[]
  }

  /**
   * JarNote findFirstOrThrow
   */
  export type JarNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * Filter, which JarNote to fetch.
     */
    where?: JarNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JarNotes to fetch.
     */
    orderBy?: JarNoteOrderByWithRelationInput | JarNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JarNotes.
     */
    cursor?: JarNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JarNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JarNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JarNotes.
     */
    distinct?: JarNoteScalarFieldEnum | JarNoteScalarFieldEnum[]
  }

  /**
   * JarNote findMany
   */
  export type JarNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * Filter, which JarNotes to fetch.
     */
    where?: JarNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JarNotes to fetch.
     */
    orderBy?: JarNoteOrderByWithRelationInput | JarNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JarNotes.
     */
    cursor?: JarNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JarNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JarNotes.
     */
    skip?: number
    distinct?: JarNoteScalarFieldEnum | JarNoteScalarFieldEnum[]
  }

  /**
   * JarNote create
   */
  export type JarNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * The data needed to create a JarNote.
     */
    data: XOR<JarNoteCreateInput, JarNoteUncheckedCreateInput>
  }

  /**
   * JarNote createMany
   */
  export type JarNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JarNotes.
     */
    data: JarNoteCreateManyInput | JarNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JarNote createManyAndReturn
   */
  export type JarNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * The data used to create many JarNotes.
     */
    data: JarNoteCreateManyInput | JarNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JarNote update
   */
  export type JarNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * The data needed to update a JarNote.
     */
    data: XOR<JarNoteUpdateInput, JarNoteUncheckedUpdateInput>
    /**
     * Choose, which JarNote to update.
     */
    where: JarNoteWhereUniqueInput
  }

  /**
   * JarNote updateMany
   */
  export type JarNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JarNotes.
     */
    data: XOR<JarNoteUpdateManyMutationInput, JarNoteUncheckedUpdateManyInput>
    /**
     * Filter which JarNotes to update
     */
    where?: JarNoteWhereInput
    /**
     * Limit how many JarNotes to update.
     */
    limit?: number
  }

  /**
   * JarNote updateManyAndReturn
   */
  export type JarNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * The data used to update JarNotes.
     */
    data: XOR<JarNoteUpdateManyMutationInput, JarNoteUncheckedUpdateManyInput>
    /**
     * Filter which JarNotes to update
     */
    where?: JarNoteWhereInput
    /**
     * Limit how many JarNotes to update.
     */
    limit?: number
  }

  /**
   * JarNote upsert
   */
  export type JarNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * The filter to search for the JarNote to update in case it exists.
     */
    where: JarNoteWhereUniqueInput
    /**
     * In case the JarNote found by the `where` argument doesn't exist, create a new JarNote with this data.
     */
    create: XOR<JarNoteCreateInput, JarNoteUncheckedCreateInput>
    /**
     * In case the JarNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JarNoteUpdateInput, JarNoteUncheckedUpdateInput>
  }

  /**
   * JarNote delete
   */
  export type JarNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
    /**
     * Filter which JarNote to delete.
     */
    where: JarNoteWhereUniqueInput
  }

  /**
   * JarNote deleteMany
   */
  export type JarNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JarNotes to delete
     */
    where?: JarNoteWhereInput
    /**
     * Limit how many JarNotes to delete.
     */
    limit?: number
  }

  /**
   * JarNote without action
   */
  export type JarNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JarNote
     */
    select?: JarNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JarNote
     */
    omit?: JarNoteOmit<ExtArgs> | null
  }


  /**
   * Model LoveNote
   */

  export type AggregateLoveNote = {
    _count: LoveNoteCountAggregateOutputType | null
    _avg: LoveNoteAvgAggregateOutputType | null
    _sum: LoveNoteSumAggregateOutputType | null
    _min: LoveNoteMinAggregateOutputType | null
    _max: LoveNoteMaxAggregateOutputType | null
  }

  export type LoveNoteAvgAggregateOutputType = {
    x: number | null
    y: number | null
    rotation: number | null
  }

  export type LoveNoteSumAggregateOutputType = {
    x: number | null
    y: number | null
    rotation: number | null
  }

  export type LoveNoteMinAggregateOutputType = {
    id: string | null
    content: string | null
    imageUrl: string | null
    sender: string | null
    x: number | null
    y: number | null
    rotation: number | null
    createdAt: Date | null
  }

  export type LoveNoteMaxAggregateOutputType = {
    id: string | null
    content: string | null
    imageUrl: string | null
    sender: string | null
    x: number | null
    y: number | null
    rotation: number | null
    createdAt: Date | null
  }

  export type LoveNoteCountAggregateOutputType = {
    id: number
    content: number
    imageUrl: number
    sender: number
    x: number
    y: number
    rotation: number
    createdAt: number
    _all: number
  }


  export type LoveNoteAvgAggregateInputType = {
    x?: true
    y?: true
    rotation?: true
  }

  export type LoveNoteSumAggregateInputType = {
    x?: true
    y?: true
    rotation?: true
  }

  export type LoveNoteMinAggregateInputType = {
    id?: true
    content?: true
    imageUrl?: true
    sender?: true
    x?: true
    y?: true
    rotation?: true
    createdAt?: true
  }

  export type LoveNoteMaxAggregateInputType = {
    id?: true
    content?: true
    imageUrl?: true
    sender?: true
    x?: true
    y?: true
    rotation?: true
    createdAt?: true
  }

  export type LoveNoteCountAggregateInputType = {
    id?: true
    content?: true
    imageUrl?: true
    sender?: true
    x?: true
    y?: true
    rotation?: true
    createdAt?: true
    _all?: true
  }

  export type LoveNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoveNote to aggregate.
     */
    where?: LoveNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoveNotes to fetch.
     */
    orderBy?: LoveNoteOrderByWithRelationInput | LoveNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoveNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoveNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoveNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoveNotes
    **/
    _count?: true | LoveNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoveNoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoveNoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoveNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoveNoteMaxAggregateInputType
  }

  export type GetLoveNoteAggregateType<T extends LoveNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateLoveNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoveNote[P]>
      : GetScalarType<T[P], AggregateLoveNote[P]>
  }




  export type LoveNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoveNoteWhereInput
    orderBy?: LoveNoteOrderByWithAggregationInput | LoveNoteOrderByWithAggregationInput[]
    by: LoveNoteScalarFieldEnum[] | LoveNoteScalarFieldEnum
    having?: LoveNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoveNoteCountAggregateInputType | true
    _avg?: LoveNoteAvgAggregateInputType
    _sum?: LoveNoteSumAggregateInputType
    _min?: LoveNoteMinAggregateInputType
    _max?: LoveNoteMaxAggregateInputType
  }

  export type LoveNoteGroupByOutputType = {
    id: string
    content: string | null
    imageUrl: string | null
    sender: string
    x: number
    y: number
    rotation: number
    createdAt: Date
    _count: LoveNoteCountAggregateOutputType | null
    _avg: LoveNoteAvgAggregateOutputType | null
    _sum: LoveNoteSumAggregateOutputType | null
    _min: LoveNoteMinAggregateOutputType | null
    _max: LoveNoteMaxAggregateOutputType | null
  }

  type GetLoveNoteGroupByPayload<T extends LoveNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoveNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoveNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoveNoteGroupByOutputType[P]>
            : GetScalarType<T[P], LoveNoteGroupByOutputType[P]>
        }
      >
    >


  export type LoveNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    sender?: boolean
    x?: boolean
    y?: boolean
    rotation?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["loveNote"]>

  export type LoveNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    sender?: boolean
    x?: boolean
    y?: boolean
    rotation?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["loveNote"]>

  export type LoveNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    sender?: boolean
    x?: boolean
    y?: boolean
    rotation?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["loveNote"]>

  export type LoveNoteSelectScalar = {
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    sender?: boolean
    x?: boolean
    y?: boolean
    rotation?: boolean
    createdAt?: boolean
  }

  export type LoveNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "imageUrl" | "sender" | "x" | "y" | "rotation" | "createdAt", ExtArgs["result"]["loveNote"]>

  export type $LoveNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoveNote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string | null
      imageUrl: string | null
      sender: string
      x: number
      y: number
      rotation: number
      createdAt: Date
    }, ExtArgs["result"]["loveNote"]>
    composites: {}
  }

  type LoveNoteGetPayload<S extends boolean | null | undefined | LoveNoteDefaultArgs> = $Result.GetResult<Prisma.$LoveNotePayload, S>

  type LoveNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoveNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoveNoteCountAggregateInputType | true
    }

  export interface LoveNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoveNote'], meta: { name: 'LoveNote' } }
    /**
     * Find zero or one LoveNote that matches the filter.
     * @param {LoveNoteFindUniqueArgs} args - Arguments to find a LoveNote
     * @example
     * // Get one LoveNote
     * const loveNote = await prisma.loveNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoveNoteFindUniqueArgs>(args: SelectSubset<T, LoveNoteFindUniqueArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoveNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoveNoteFindUniqueOrThrowArgs} args - Arguments to find a LoveNote
     * @example
     * // Get one LoveNote
     * const loveNote = await prisma.loveNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoveNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, LoveNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoveNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteFindFirstArgs} args - Arguments to find a LoveNote
     * @example
     * // Get one LoveNote
     * const loveNote = await prisma.loveNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoveNoteFindFirstArgs>(args?: SelectSubset<T, LoveNoteFindFirstArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoveNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteFindFirstOrThrowArgs} args - Arguments to find a LoveNote
     * @example
     * // Get one LoveNote
     * const loveNote = await prisma.loveNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoveNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, LoveNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoveNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoveNotes
     * const loveNotes = await prisma.loveNote.findMany()
     * 
     * // Get first 10 LoveNotes
     * const loveNotes = await prisma.loveNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loveNoteWithIdOnly = await prisma.loveNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoveNoteFindManyArgs>(args?: SelectSubset<T, LoveNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoveNote.
     * @param {LoveNoteCreateArgs} args - Arguments to create a LoveNote.
     * @example
     * // Create one LoveNote
     * const LoveNote = await prisma.loveNote.create({
     *   data: {
     *     // ... data to create a LoveNote
     *   }
     * })
     * 
     */
    create<T extends LoveNoteCreateArgs>(args: SelectSubset<T, LoveNoteCreateArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoveNotes.
     * @param {LoveNoteCreateManyArgs} args - Arguments to create many LoveNotes.
     * @example
     * // Create many LoveNotes
     * const loveNote = await prisma.loveNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoveNoteCreateManyArgs>(args?: SelectSubset<T, LoveNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoveNotes and returns the data saved in the database.
     * @param {LoveNoteCreateManyAndReturnArgs} args - Arguments to create many LoveNotes.
     * @example
     * // Create many LoveNotes
     * const loveNote = await prisma.loveNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoveNotes and only return the `id`
     * const loveNoteWithIdOnly = await prisma.loveNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoveNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, LoveNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoveNote.
     * @param {LoveNoteDeleteArgs} args - Arguments to delete one LoveNote.
     * @example
     * // Delete one LoveNote
     * const LoveNote = await prisma.loveNote.delete({
     *   where: {
     *     // ... filter to delete one LoveNote
     *   }
     * })
     * 
     */
    delete<T extends LoveNoteDeleteArgs>(args: SelectSubset<T, LoveNoteDeleteArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoveNote.
     * @param {LoveNoteUpdateArgs} args - Arguments to update one LoveNote.
     * @example
     * // Update one LoveNote
     * const loveNote = await prisma.loveNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoveNoteUpdateArgs>(args: SelectSubset<T, LoveNoteUpdateArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoveNotes.
     * @param {LoveNoteDeleteManyArgs} args - Arguments to filter LoveNotes to delete.
     * @example
     * // Delete a few LoveNotes
     * const { count } = await prisma.loveNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoveNoteDeleteManyArgs>(args?: SelectSubset<T, LoveNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoveNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoveNotes
     * const loveNote = await prisma.loveNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoveNoteUpdateManyArgs>(args: SelectSubset<T, LoveNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoveNotes and returns the data updated in the database.
     * @param {LoveNoteUpdateManyAndReturnArgs} args - Arguments to update many LoveNotes.
     * @example
     * // Update many LoveNotes
     * const loveNote = await prisma.loveNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoveNotes and only return the `id`
     * const loveNoteWithIdOnly = await prisma.loveNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoveNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, LoveNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoveNote.
     * @param {LoveNoteUpsertArgs} args - Arguments to update or create a LoveNote.
     * @example
     * // Update or create a LoveNote
     * const loveNote = await prisma.loveNote.upsert({
     *   create: {
     *     // ... data to create a LoveNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoveNote we want to update
     *   }
     * })
     */
    upsert<T extends LoveNoteUpsertArgs>(args: SelectSubset<T, LoveNoteUpsertArgs<ExtArgs>>): Prisma__LoveNoteClient<$Result.GetResult<Prisma.$LoveNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoveNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteCountArgs} args - Arguments to filter LoveNotes to count.
     * @example
     * // Count the number of LoveNotes
     * const count = await prisma.loveNote.count({
     *   where: {
     *     // ... the filter for the LoveNotes we want to count
     *   }
     * })
    **/
    count<T extends LoveNoteCountArgs>(
      args?: Subset<T, LoveNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoveNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoveNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoveNoteAggregateArgs>(args: Subset<T, LoveNoteAggregateArgs>): Prisma.PrismaPromise<GetLoveNoteAggregateType<T>>

    /**
     * Group by LoveNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoveNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoveNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoveNoteGroupByArgs['orderBy'] }
        : { orderBy?: LoveNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoveNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoveNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoveNote model
   */
  readonly fields: LoveNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoveNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoveNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoveNote model
   */
  interface LoveNoteFieldRefs {
    readonly id: FieldRef<"LoveNote", 'String'>
    readonly content: FieldRef<"LoveNote", 'String'>
    readonly imageUrl: FieldRef<"LoveNote", 'String'>
    readonly sender: FieldRef<"LoveNote", 'String'>
    readonly x: FieldRef<"LoveNote", 'Float'>
    readonly y: FieldRef<"LoveNote", 'Float'>
    readonly rotation: FieldRef<"LoveNote", 'Float'>
    readonly createdAt: FieldRef<"LoveNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoveNote findUnique
   */
  export type LoveNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * Filter, which LoveNote to fetch.
     */
    where: LoveNoteWhereUniqueInput
  }

  /**
   * LoveNote findUniqueOrThrow
   */
  export type LoveNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * Filter, which LoveNote to fetch.
     */
    where: LoveNoteWhereUniqueInput
  }

  /**
   * LoveNote findFirst
   */
  export type LoveNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * Filter, which LoveNote to fetch.
     */
    where?: LoveNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoveNotes to fetch.
     */
    orderBy?: LoveNoteOrderByWithRelationInput | LoveNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoveNotes.
     */
    cursor?: LoveNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoveNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoveNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoveNotes.
     */
    distinct?: LoveNoteScalarFieldEnum | LoveNoteScalarFieldEnum[]
  }

  /**
   * LoveNote findFirstOrThrow
   */
  export type LoveNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * Filter, which LoveNote to fetch.
     */
    where?: LoveNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoveNotes to fetch.
     */
    orderBy?: LoveNoteOrderByWithRelationInput | LoveNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoveNotes.
     */
    cursor?: LoveNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoveNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoveNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoveNotes.
     */
    distinct?: LoveNoteScalarFieldEnum | LoveNoteScalarFieldEnum[]
  }

  /**
   * LoveNote findMany
   */
  export type LoveNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * Filter, which LoveNotes to fetch.
     */
    where?: LoveNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoveNotes to fetch.
     */
    orderBy?: LoveNoteOrderByWithRelationInput | LoveNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoveNotes.
     */
    cursor?: LoveNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoveNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoveNotes.
     */
    skip?: number
    distinct?: LoveNoteScalarFieldEnum | LoveNoteScalarFieldEnum[]
  }

  /**
   * LoveNote create
   */
  export type LoveNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * The data needed to create a LoveNote.
     */
    data: XOR<LoveNoteCreateInput, LoveNoteUncheckedCreateInput>
  }

  /**
   * LoveNote createMany
   */
  export type LoveNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoveNotes.
     */
    data: LoveNoteCreateManyInput | LoveNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoveNote createManyAndReturn
   */
  export type LoveNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * The data used to create many LoveNotes.
     */
    data: LoveNoteCreateManyInput | LoveNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoveNote update
   */
  export type LoveNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * The data needed to update a LoveNote.
     */
    data: XOR<LoveNoteUpdateInput, LoveNoteUncheckedUpdateInput>
    /**
     * Choose, which LoveNote to update.
     */
    where: LoveNoteWhereUniqueInput
  }

  /**
   * LoveNote updateMany
   */
  export type LoveNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoveNotes.
     */
    data: XOR<LoveNoteUpdateManyMutationInput, LoveNoteUncheckedUpdateManyInput>
    /**
     * Filter which LoveNotes to update
     */
    where?: LoveNoteWhereInput
    /**
     * Limit how many LoveNotes to update.
     */
    limit?: number
  }

  /**
   * LoveNote updateManyAndReturn
   */
  export type LoveNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * The data used to update LoveNotes.
     */
    data: XOR<LoveNoteUpdateManyMutationInput, LoveNoteUncheckedUpdateManyInput>
    /**
     * Filter which LoveNotes to update
     */
    where?: LoveNoteWhereInput
    /**
     * Limit how many LoveNotes to update.
     */
    limit?: number
  }

  /**
   * LoveNote upsert
   */
  export type LoveNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * The filter to search for the LoveNote to update in case it exists.
     */
    where: LoveNoteWhereUniqueInput
    /**
     * In case the LoveNote found by the `where` argument doesn't exist, create a new LoveNote with this data.
     */
    create: XOR<LoveNoteCreateInput, LoveNoteUncheckedCreateInput>
    /**
     * In case the LoveNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoveNoteUpdateInput, LoveNoteUncheckedUpdateInput>
  }

  /**
   * LoveNote delete
   */
  export type LoveNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
    /**
     * Filter which LoveNote to delete.
     */
    where: LoveNoteWhereUniqueInput
  }

  /**
   * LoveNote deleteMany
   */
  export type LoveNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoveNotes to delete
     */
    where?: LoveNoteWhereInput
    /**
     * Limit how many LoveNotes to delete.
     */
    limit?: number
  }

  /**
   * LoveNote without action
   */
  export type LoveNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoveNote
     */
    select?: LoveNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoveNote
     */
    omit?: LoveNoteOmit<ExtArgs> | null
  }


  /**
   * Model Milestone
   */

  export type AggregateMilestone = {
    _count: MilestoneCountAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  export type MilestoneMinAggregateOutputType = {
    id: string | null
    title: string | null
    date: Date | null
    type: string | null
    createdAt: Date | null
  }

  export type MilestoneMaxAggregateOutputType = {
    id: string | null
    title: string | null
    date: Date | null
    type: string | null
    createdAt: Date | null
  }

  export type MilestoneCountAggregateOutputType = {
    id: number
    title: number
    date: number
    type: number
    createdAt: number
    _all: number
  }


  export type MilestoneMinAggregateInputType = {
    id?: true
    title?: true
    date?: true
    type?: true
    createdAt?: true
  }

  export type MilestoneMaxAggregateInputType = {
    id?: true
    title?: true
    date?: true
    type?: true
    createdAt?: true
  }

  export type MilestoneCountAggregateInputType = {
    id?: true
    title?: true
    date?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type MilestoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestone to aggregate.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Milestones
    **/
    _count?: true | MilestoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MilestoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MilestoneMaxAggregateInputType
  }

  export type GetMilestoneAggregateType<T extends MilestoneAggregateArgs> = {
        [P in keyof T & keyof AggregateMilestone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMilestone[P]>
      : GetScalarType<T[P], AggregateMilestone[P]>
  }




  export type MilestoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithAggregationInput | MilestoneOrderByWithAggregationInput[]
    by: MilestoneScalarFieldEnum[] | MilestoneScalarFieldEnum
    having?: MilestoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MilestoneCountAggregateInputType | true
    _min?: MilestoneMinAggregateInputType
    _max?: MilestoneMaxAggregateInputType
  }

  export type MilestoneGroupByOutputType = {
    id: string
    title: string
    date: Date
    type: string
    createdAt: Date
    _count: MilestoneCountAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  type GetMilestoneGroupByPayload<T extends MilestoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MilestoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MilestoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
            : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
        }
      >
    >


  export type MilestoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectScalar = {
    id?: boolean
    title?: boolean
    date?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type MilestoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "date" | "type" | "createdAt", ExtArgs["result"]["milestone"]>

  export type $MilestonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Milestone"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      date: Date
      type: string
      createdAt: Date
    }, ExtArgs["result"]["milestone"]>
    composites: {}
  }

  type MilestoneGetPayload<S extends boolean | null | undefined | MilestoneDefaultArgs> = $Result.GetResult<Prisma.$MilestonePayload, S>

  type MilestoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MilestoneCountAggregateInputType | true
    }

  export interface MilestoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Milestone'], meta: { name: 'Milestone' } }
    /**
     * Find zero or one Milestone that matches the filter.
     * @param {MilestoneFindUniqueArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MilestoneFindUniqueArgs>(args: SelectSubset<T, MilestoneFindUniqueArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Milestone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MilestoneFindUniqueOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MilestoneFindUniqueOrThrowArgs>(args: SelectSubset<T, MilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MilestoneFindFirstArgs>(args?: SelectSubset<T, MilestoneFindFirstArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MilestoneFindFirstOrThrowArgs>(args?: SelectSubset<T, MilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Milestones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Milestones
     * const milestones = await prisma.milestone.findMany()
     * 
     * // Get first 10 Milestones
     * const milestones = await prisma.milestone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const milestoneWithIdOnly = await prisma.milestone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MilestoneFindManyArgs>(args?: SelectSubset<T, MilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Milestone.
     * @param {MilestoneCreateArgs} args - Arguments to create a Milestone.
     * @example
     * // Create one Milestone
     * const Milestone = await prisma.milestone.create({
     *   data: {
     *     // ... data to create a Milestone
     *   }
     * })
     * 
     */
    create<T extends MilestoneCreateArgs>(args: SelectSubset<T, MilestoneCreateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Milestones.
     * @param {MilestoneCreateManyArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MilestoneCreateManyArgs>(args?: SelectSubset<T, MilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Milestones and returns the data saved in the database.
     * @param {MilestoneCreateManyAndReturnArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MilestoneCreateManyAndReturnArgs>(args?: SelectSubset<T, MilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Milestone.
     * @param {MilestoneDeleteArgs} args - Arguments to delete one Milestone.
     * @example
     * // Delete one Milestone
     * const Milestone = await prisma.milestone.delete({
     *   where: {
     *     // ... filter to delete one Milestone
     *   }
     * })
     * 
     */
    delete<T extends MilestoneDeleteArgs>(args: SelectSubset<T, MilestoneDeleteArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Milestone.
     * @param {MilestoneUpdateArgs} args - Arguments to update one Milestone.
     * @example
     * // Update one Milestone
     * const milestone = await prisma.milestone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MilestoneUpdateArgs>(args: SelectSubset<T, MilestoneUpdateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Milestones.
     * @param {MilestoneDeleteManyArgs} args - Arguments to filter Milestones to delete.
     * @example
     * // Delete a few Milestones
     * const { count } = await prisma.milestone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MilestoneDeleteManyArgs>(args?: SelectSubset<T, MilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MilestoneUpdateManyArgs>(args: SelectSubset<T, MilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones and returns the data updated in the database.
     * @param {MilestoneUpdateManyAndReturnArgs} args - Arguments to update many Milestones.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MilestoneUpdateManyAndReturnArgs>(args: SelectSubset<T, MilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Milestone.
     * @param {MilestoneUpsertArgs} args - Arguments to update or create a Milestone.
     * @example
     * // Update or create a Milestone
     * const milestone = await prisma.milestone.upsert({
     *   create: {
     *     // ... data to create a Milestone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Milestone we want to update
     *   }
     * })
     */
    upsert<T extends MilestoneUpsertArgs>(args: SelectSubset<T, MilestoneUpsertArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneCountArgs} args - Arguments to filter Milestones to count.
     * @example
     * // Count the number of Milestones
     * const count = await prisma.milestone.count({
     *   where: {
     *     // ... the filter for the Milestones we want to count
     *   }
     * })
    **/
    count<T extends MilestoneCountArgs>(
      args?: Subset<T, MilestoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MilestoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MilestoneAggregateArgs>(args: Subset<T, MilestoneAggregateArgs>): Prisma.PrismaPromise<GetMilestoneAggregateType<T>>

    /**
     * Group by Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MilestoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MilestoneGroupByArgs['orderBy'] }
        : { orderBy?: MilestoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Milestone model
   */
  readonly fields: MilestoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Milestone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MilestoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Milestone model
   */
  interface MilestoneFieldRefs {
    readonly id: FieldRef<"Milestone", 'String'>
    readonly title: FieldRef<"Milestone", 'String'>
    readonly date: FieldRef<"Milestone", 'DateTime'>
    readonly type: FieldRef<"Milestone", 'String'>
    readonly createdAt: FieldRef<"Milestone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Milestone findUnique
   */
  export type MilestoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findUniqueOrThrow
   */
  export type MilestoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findFirst
   */
  export type MilestoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findFirstOrThrow
   */
  export type MilestoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findMany
   */
  export type MilestoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Filter, which Milestones to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone create
   */
  export type MilestoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data needed to create a Milestone.
     */
    data: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
  }

  /**
   * Milestone createMany
   */
  export type MilestoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Milestone createManyAndReturn
   */
  export type MilestoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Milestone update
   */
  export type MilestoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data needed to update a Milestone.
     */
    data: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
    /**
     * Choose, which Milestone to update.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone updateMany
   */
  export type MilestoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
  }

  /**
   * Milestone updateManyAndReturn
   */
  export type MilestoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
  }

  /**
   * Milestone upsert
   */
  export type MilestoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The filter to search for the Milestone to update in case it exists.
     */
    where: MilestoneWhereUniqueInput
    /**
     * In case the Milestone found by the `where` argument doesn't exist, create a new Milestone with this data.
     */
    create: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
    /**
     * In case the Milestone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
  }

  /**
   * Milestone delete
   */
  export type MilestoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Filter which Milestone to delete.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone deleteMany
   */
  export type MilestoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestones to delete
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to delete.
     */
    limit?: number
  }

  /**
   * Milestone without action
   */
  export type MilestoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
  }


  /**
   * Model LoginHistory
   */

  export type AggregateLoginHistory = {
    _count: LoginHistoryCountAggregateOutputType | null
    _min: LoginHistoryMinAggregateOutputType | null
    _max: LoginHistoryMaxAggregateOutputType | null
  }

  export type LoginHistoryMinAggregateOutputType = {
    id: string | null
    role: string | null
    timestamp: Date | null
  }

  export type LoginHistoryMaxAggregateOutputType = {
    id: string | null
    role: string | null
    timestamp: Date | null
  }

  export type LoginHistoryCountAggregateOutputType = {
    id: number
    role: number
    timestamp: number
    _all: number
  }


  export type LoginHistoryMinAggregateInputType = {
    id?: true
    role?: true
    timestamp?: true
  }

  export type LoginHistoryMaxAggregateInputType = {
    id?: true
    role?: true
    timestamp?: true
  }

  export type LoginHistoryCountAggregateInputType = {
    id?: true
    role?: true
    timestamp?: true
    _all?: true
  }

  export type LoginHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginHistory to aggregate.
     */
    where?: LoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginHistories to fetch.
     */
    orderBy?: LoginHistoryOrderByWithRelationInput | LoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoginHistories
    **/
    _count?: true | LoginHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoginHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoginHistoryMaxAggregateInputType
  }

  export type GetLoginHistoryAggregateType<T extends LoginHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateLoginHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoginHistory[P]>
      : GetScalarType<T[P], AggregateLoginHistory[P]>
  }




  export type LoginHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoginHistoryWhereInput
    orderBy?: LoginHistoryOrderByWithAggregationInput | LoginHistoryOrderByWithAggregationInput[]
    by: LoginHistoryScalarFieldEnum[] | LoginHistoryScalarFieldEnum
    having?: LoginHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoginHistoryCountAggregateInputType | true
    _min?: LoginHistoryMinAggregateInputType
    _max?: LoginHistoryMaxAggregateInputType
  }

  export type LoginHistoryGroupByOutputType = {
    id: string
    role: string
    timestamp: Date
    _count: LoginHistoryCountAggregateOutputType | null
    _min: LoginHistoryMinAggregateOutputType | null
    _max: LoginHistoryMaxAggregateOutputType | null
  }

  type GetLoginHistoryGroupByPayload<T extends LoginHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoginHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoginHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoginHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], LoginHistoryGroupByOutputType[P]>
        }
      >
    >


  export type LoginHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["loginHistory"]>

  export type LoginHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["loginHistory"]>

  export type LoginHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["loginHistory"]>

  export type LoginHistorySelectScalar = {
    id?: boolean
    role?: boolean
    timestamp?: boolean
  }

  export type LoginHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "timestamp", ExtArgs["result"]["loginHistory"]>

  export type $LoginHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoginHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: string
      timestamp: Date
    }, ExtArgs["result"]["loginHistory"]>
    composites: {}
  }

  type LoginHistoryGetPayload<S extends boolean | null | undefined | LoginHistoryDefaultArgs> = $Result.GetResult<Prisma.$LoginHistoryPayload, S>

  type LoginHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoginHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoginHistoryCountAggregateInputType | true
    }

  export interface LoginHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoginHistory'], meta: { name: 'LoginHistory' } }
    /**
     * Find zero or one LoginHistory that matches the filter.
     * @param {LoginHistoryFindUniqueArgs} args - Arguments to find a LoginHistory
     * @example
     * // Get one LoginHistory
     * const loginHistory = await prisma.loginHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoginHistoryFindUniqueArgs>(args: SelectSubset<T, LoginHistoryFindUniqueArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoginHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoginHistoryFindUniqueOrThrowArgs} args - Arguments to find a LoginHistory
     * @example
     * // Get one LoginHistory
     * const loginHistory = await prisma.loginHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoginHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, LoginHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoginHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryFindFirstArgs} args - Arguments to find a LoginHistory
     * @example
     * // Get one LoginHistory
     * const loginHistory = await prisma.loginHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoginHistoryFindFirstArgs>(args?: SelectSubset<T, LoginHistoryFindFirstArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoginHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryFindFirstOrThrowArgs} args - Arguments to find a LoginHistory
     * @example
     * // Get one LoginHistory
     * const loginHistory = await prisma.loginHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoginHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, LoginHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoginHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoginHistories
     * const loginHistories = await prisma.loginHistory.findMany()
     * 
     * // Get first 10 LoginHistories
     * const loginHistories = await prisma.loginHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loginHistoryWithIdOnly = await prisma.loginHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoginHistoryFindManyArgs>(args?: SelectSubset<T, LoginHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoginHistory.
     * @param {LoginHistoryCreateArgs} args - Arguments to create a LoginHistory.
     * @example
     * // Create one LoginHistory
     * const LoginHistory = await prisma.loginHistory.create({
     *   data: {
     *     // ... data to create a LoginHistory
     *   }
     * })
     * 
     */
    create<T extends LoginHistoryCreateArgs>(args: SelectSubset<T, LoginHistoryCreateArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoginHistories.
     * @param {LoginHistoryCreateManyArgs} args - Arguments to create many LoginHistories.
     * @example
     * // Create many LoginHistories
     * const loginHistory = await prisma.loginHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoginHistoryCreateManyArgs>(args?: SelectSubset<T, LoginHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoginHistories and returns the data saved in the database.
     * @param {LoginHistoryCreateManyAndReturnArgs} args - Arguments to create many LoginHistories.
     * @example
     * // Create many LoginHistories
     * const loginHistory = await prisma.loginHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoginHistories and only return the `id`
     * const loginHistoryWithIdOnly = await prisma.loginHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoginHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, LoginHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoginHistory.
     * @param {LoginHistoryDeleteArgs} args - Arguments to delete one LoginHistory.
     * @example
     * // Delete one LoginHistory
     * const LoginHistory = await prisma.loginHistory.delete({
     *   where: {
     *     // ... filter to delete one LoginHistory
     *   }
     * })
     * 
     */
    delete<T extends LoginHistoryDeleteArgs>(args: SelectSubset<T, LoginHistoryDeleteArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoginHistory.
     * @param {LoginHistoryUpdateArgs} args - Arguments to update one LoginHistory.
     * @example
     * // Update one LoginHistory
     * const loginHistory = await prisma.loginHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoginHistoryUpdateArgs>(args: SelectSubset<T, LoginHistoryUpdateArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoginHistories.
     * @param {LoginHistoryDeleteManyArgs} args - Arguments to filter LoginHistories to delete.
     * @example
     * // Delete a few LoginHistories
     * const { count } = await prisma.loginHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoginHistoryDeleteManyArgs>(args?: SelectSubset<T, LoginHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoginHistories
     * const loginHistory = await prisma.loginHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoginHistoryUpdateManyArgs>(args: SelectSubset<T, LoginHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginHistories and returns the data updated in the database.
     * @param {LoginHistoryUpdateManyAndReturnArgs} args - Arguments to update many LoginHistories.
     * @example
     * // Update many LoginHistories
     * const loginHistory = await prisma.loginHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoginHistories and only return the `id`
     * const loginHistoryWithIdOnly = await prisma.loginHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoginHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, LoginHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoginHistory.
     * @param {LoginHistoryUpsertArgs} args - Arguments to update or create a LoginHistory.
     * @example
     * // Update or create a LoginHistory
     * const loginHistory = await prisma.loginHistory.upsert({
     *   create: {
     *     // ... data to create a LoginHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoginHistory we want to update
     *   }
     * })
     */
    upsert<T extends LoginHistoryUpsertArgs>(args: SelectSubset<T, LoginHistoryUpsertArgs<ExtArgs>>): Prisma__LoginHistoryClient<$Result.GetResult<Prisma.$LoginHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoginHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryCountArgs} args - Arguments to filter LoginHistories to count.
     * @example
     * // Count the number of LoginHistories
     * const count = await prisma.loginHistory.count({
     *   where: {
     *     // ... the filter for the LoginHistories we want to count
     *   }
     * })
    **/
    count<T extends LoginHistoryCountArgs>(
      args?: Subset<T, LoginHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoginHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoginHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoginHistoryAggregateArgs>(args: Subset<T, LoginHistoryAggregateArgs>): Prisma.PrismaPromise<GetLoginHistoryAggregateType<T>>

    /**
     * Group by LoginHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoginHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoginHistoryGroupByArgs['orderBy'] }
        : { orderBy?: LoginHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoginHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoginHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoginHistory model
   */
  readonly fields: LoginHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoginHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoginHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoginHistory model
   */
  interface LoginHistoryFieldRefs {
    readonly id: FieldRef<"LoginHistory", 'String'>
    readonly role: FieldRef<"LoginHistory", 'String'>
    readonly timestamp: FieldRef<"LoginHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoginHistory findUnique
   */
  export type LoginHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * Filter, which LoginHistory to fetch.
     */
    where: LoginHistoryWhereUniqueInput
  }

  /**
   * LoginHistory findUniqueOrThrow
   */
  export type LoginHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * Filter, which LoginHistory to fetch.
     */
    where: LoginHistoryWhereUniqueInput
  }

  /**
   * LoginHistory findFirst
   */
  export type LoginHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * Filter, which LoginHistory to fetch.
     */
    where?: LoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginHistories to fetch.
     */
    orderBy?: LoginHistoryOrderByWithRelationInput | LoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginHistories.
     */
    cursor?: LoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginHistories.
     */
    distinct?: LoginHistoryScalarFieldEnum | LoginHistoryScalarFieldEnum[]
  }

  /**
   * LoginHistory findFirstOrThrow
   */
  export type LoginHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * Filter, which LoginHistory to fetch.
     */
    where?: LoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginHistories to fetch.
     */
    orderBy?: LoginHistoryOrderByWithRelationInput | LoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginHistories.
     */
    cursor?: LoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginHistories.
     */
    distinct?: LoginHistoryScalarFieldEnum | LoginHistoryScalarFieldEnum[]
  }

  /**
   * LoginHistory findMany
   */
  export type LoginHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * Filter, which LoginHistories to fetch.
     */
    where?: LoginHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginHistories to fetch.
     */
    orderBy?: LoginHistoryOrderByWithRelationInput | LoginHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoginHistories.
     */
    cursor?: LoginHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginHistories.
     */
    skip?: number
    distinct?: LoginHistoryScalarFieldEnum | LoginHistoryScalarFieldEnum[]
  }

  /**
   * LoginHistory create
   */
  export type LoginHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * The data needed to create a LoginHistory.
     */
    data: XOR<LoginHistoryCreateInput, LoginHistoryUncheckedCreateInput>
  }

  /**
   * LoginHistory createMany
   */
  export type LoginHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoginHistories.
     */
    data: LoginHistoryCreateManyInput | LoginHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoginHistory createManyAndReturn
   */
  export type LoginHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many LoginHistories.
     */
    data: LoginHistoryCreateManyInput | LoginHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoginHistory update
   */
  export type LoginHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * The data needed to update a LoginHistory.
     */
    data: XOR<LoginHistoryUpdateInput, LoginHistoryUncheckedUpdateInput>
    /**
     * Choose, which LoginHistory to update.
     */
    where: LoginHistoryWhereUniqueInput
  }

  /**
   * LoginHistory updateMany
   */
  export type LoginHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoginHistories.
     */
    data: XOR<LoginHistoryUpdateManyMutationInput, LoginHistoryUncheckedUpdateManyInput>
    /**
     * Filter which LoginHistories to update
     */
    where?: LoginHistoryWhereInput
    /**
     * Limit how many LoginHistories to update.
     */
    limit?: number
  }

  /**
   * LoginHistory updateManyAndReturn
   */
  export type LoginHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * The data used to update LoginHistories.
     */
    data: XOR<LoginHistoryUpdateManyMutationInput, LoginHistoryUncheckedUpdateManyInput>
    /**
     * Filter which LoginHistories to update
     */
    where?: LoginHistoryWhereInput
    /**
     * Limit how many LoginHistories to update.
     */
    limit?: number
  }

  /**
   * LoginHistory upsert
   */
  export type LoginHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * The filter to search for the LoginHistory to update in case it exists.
     */
    where: LoginHistoryWhereUniqueInput
    /**
     * In case the LoginHistory found by the `where` argument doesn't exist, create a new LoginHistory with this data.
     */
    create: XOR<LoginHistoryCreateInput, LoginHistoryUncheckedCreateInput>
    /**
     * In case the LoginHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoginHistoryUpdateInput, LoginHistoryUncheckedUpdateInput>
  }

  /**
   * LoginHistory delete
   */
  export type LoginHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
    /**
     * Filter which LoginHistory to delete.
     */
    where: LoginHistoryWhereUniqueInput
  }

  /**
   * LoginHistory deleteMany
   */
  export type LoginHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginHistories to delete
     */
    where?: LoginHistoryWhereInput
    /**
     * Limit how many LoginHistories to delete.
     */
    limit?: number
  }

  /**
   * LoginHistory without action
   */
  export type LoginHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginHistory
     */
    select?: LoginHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginHistory
     */
    omit?: LoginHistoryOmit<ExtArgs> | null
  }


  /**
   * Model Image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    cloudinaryId: string | null
    url: string | null
    sender: string | null
    receiver: string | null
    viewType: string | null
    viewed: boolean | null
    createdAt: Date | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    cloudinaryId: string | null
    url: string | null
    sender: string | null
    receiver: string | null
    viewType: string | null
    viewed: boolean | null
    createdAt: Date | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    cloudinaryId: number
    url: number
    sender: number
    receiver: number
    viewType: number
    viewed: number
    createdAt: number
    _all: number
  }


  export type ImageMinAggregateInputType = {
    id?: true
    cloudinaryId?: true
    url?: true
    sender?: true
    receiver?: true
    viewType?: true
    viewed?: true
    createdAt?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    cloudinaryId?: true
    url?: true
    sender?: true
    receiver?: true
    viewType?: true
    viewed?: true
    createdAt?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    cloudinaryId?: true
    url?: true
    sender?: true
    receiver?: true
    viewType?: true
    viewed?: true
    createdAt?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithAggregationInput | ImageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    cloudinaryId: string
    url: string
    sender: string
    receiver: string
    viewType: string
    viewed: boolean
    createdAt: Date
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cloudinaryId?: boolean
    url?: boolean
    sender?: boolean
    receiver?: boolean
    viewType?: boolean
    viewed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cloudinaryId?: boolean
    url?: boolean
    sender?: boolean
    receiver?: boolean
    viewType?: boolean
    viewed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cloudinaryId?: boolean
    url?: boolean
    sender?: boolean
    receiver?: boolean
    viewType?: boolean
    viewed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["image"]>

  export type ImageSelectScalar = {
    id?: boolean
    cloudinaryId?: boolean
    url?: boolean
    sender?: boolean
    receiver?: boolean
    viewType?: boolean
    viewed?: boolean
    createdAt?: boolean
  }

  export type ImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cloudinaryId" | "url" | "sender" | "receiver" | "viewType" | "viewed" | "createdAt", ExtArgs["result"]["image"]>

  export type $ImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Image"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cloudinaryId: string
      url: string
      sender: string
      receiver: string
      viewType: string
      viewed: boolean
      createdAt: Date
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = $Result.GetResult<Prisma.$ImagePayload, S>

  type ImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Image'], meta: { name: 'Image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageFindUniqueArgs>(args: SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageFindFirstArgs>(args?: SelectSubset<T, ImageFindFirstArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageFindManyArgs>(args?: SelectSubset<T, ImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends ImageCreateArgs>(args: SelectSubset<T, ImageCreateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {ImageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageCreateManyArgs>(args?: SelectSubset<T, ImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {ImageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends ImageDeleteArgs>(args: SelectSubset<T, ImageDeleteArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageUpdateArgs>(args: SelectSubset<T, ImageUpdateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageDeleteManyArgs>(args?: SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageUpdateManyArgs>(args: SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images and returns the data updated in the database.
     * @param {ImageUpdateManyAndReturnArgs} args - Arguments to update many Images.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends ImageUpsertArgs>(args: SelectSubset<T, ImageUpsertArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Image model
   */
  readonly fields: ImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Image model
   */
  interface ImageFieldRefs {
    readonly id: FieldRef<"Image", 'String'>
    readonly cloudinaryId: FieldRef<"Image", 'String'>
    readonly url: FieldRef<"Image", 'String'>
    readonly sender: FieldRef<"Image", 'String'>
    readonly receiver: FieldRef<"Image", 'String'>
    readonly viewType: FieldRef<"Image", 'String'>
    readonly viewed: FieldRef<"Image", 'Boolean'>
    readonly createdAt: FieldRef<"Image", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Image findUnique
   */
  export type ImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findFirst
   */
  export type ImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findMany
   */
  export type ImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image create
   */
  export type ImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }

  /**
   * Image createMany
   */
  export type ImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image createManyAndReturn
   */
  export type ImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image update
   */
  export type ImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image updateManyAndReturn
   */
  export type ImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image upsert
   */
  export type ImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }

  /**
   * Image delete
   */
  export type ImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to delete.
     */
    limit?: number
  }

  /**
   * Image without action
   */
  export type ImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
  }


  /**
   * Model ChatActivity
   */

  export type AggregateChatActivity = {
    _count: ChatActivityCountAggregateOutputType | null
    _avg: ChatActivityAvgAggregateOutputType | null
    _sum: ChatActivitySumAggregateOutputType | null
    _min: ChatActivityMinAggregateOutputType | null
    _max: ChatActivityMaxAggregateOutputType | null
  }

  export type ChatActivityAvgAggregateOutputType = {
    messageCount: number | null
  }

  export type ChatActivitySumAggregateOutputType = {
    messageCount: number | null
  }

  export type ChatActivityMinAggregateOutputType = {
    id: string | null
    date: string | null
    sajidActive: boolean | null
    nasywaActive: boolean | null
    messageCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatActivityMaxAggregateOutputType = {
    id: string | null
    date: string | null
    sajidActive: boolean | null
    nasywaActive: boolean | null
    messageCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatActivityCountAggregateOutputType = {
    id: number
    date: number
    sajidActive: number
    nasywaActive: number
    messageCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatActivityAvgAggregateInputType = {
    messageCount?: true
  }

  export type ChatActivitySumAggregateInputType = {
    messageCount?: true
  }

  export type ChatActivityMinAggregateInputType = {
    id?: true
    date?: true
    sajidActive?: true
    nasywaActive?: true
    messageCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatActivityMaxAggregateInputType = {
    id?: true
    date?: true
    sajidActive?: true
    nasywaActive?: true
    messageCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatActivityCountAggregateInputType = {
    id?: true
    date?: true
    sajidActive?: true
    nasywaActive?: true
    messageCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatActivity to aggregate.
     */
    where?: ChatActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatActivities to fetch.
     */
    orderBy?: ChatActivityOrderByWithRelationInput | ChatActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatActivities
    **/
    _count?: true | ChatActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatActivityMaxAggregateInputType
  }

  export type GetChatActivityAggregateType<T extends ChatActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateChatActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatActivity[P]>
      : GetScalarType<T[P], AggregateChatActivity[P]>
  }




  export type ChatActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatActivityWhereInput
    orderBy?: ChatActivityOrderByWithAggregationInput | ChatActivityOrderByWithAggregationInput[]
    by: ChatActivityScalarFieldEnum[] | ChatActivityScalarFieldEnum
    having?: ChatActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatActivityCountAggregateInputType | true
    _avg?: ChatActivityAvgAggregateInputType
    _sum?: ChatActivitySumAggregateInputType
    _min?: ChatActivityMinAggregateInputType
    _max?: ChatActivityMaxAggregateInputType
  }

  export type ChatActivityGroupByOutputType = {
    id: string
    date: string
    sajidActive: boolean
    nasywaActive: boolean
    messageCount: number
    createdAt: Date
    updatedAt: Date
    _count: ChatActivityCountAggregateOutputType | null
    _avg: ChatActivityAvgAggregateOutputType | null
    _sum: ChatActivitySumAggregateOutputType | null
    _min: ChatActivityMinAggregateOutputType | null
    _max: ChatActivityMaxAggregateOutputType | null
  }

  type GetChatActivityGroupByPayload<T extends ChatActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ChatActivityGroupByOutputType[P]>
        }
      >
    >


  export type ChatActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatActivity"]>

  export type ChatActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatActivity"]>

  export type ChatActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatActivity"]>

  export type ChatActivitySelectScalar = {
    id?: boolean
    date?: boolean
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "sajidActive" | "nasywaActive" | "messageCount" | "createdAt" | "updatedAt", ExtArgs["result"]["chatActivity"]>

  export type $ChatActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatActivity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: string
      sajidActive: boolean
      nasywaActive: boolean
      messageCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatActivity"]>
    composites: {}
  }

  type ChatActivityGetPayload<S extends boolean | null | undefined | ChatActivityDefaultArgs> = $Result.GetResult<Prisma.$ChatActivityPayload, S>

  type ChatActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatActivityCountAggregateInputType | true
    }

  export interface ChatActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatActivity'], meta: { name: 'ChatActivity' } }
    /**
     * Find zero or one ChatActivity that matches the filter.
     * @param {ChatActivityFindUniqueArgs} args - Arguments to find a ChatActivity
     * @example
     * // Get one ChatActivity
     * const chatActivity = await prisma.chatActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatActivityFindUniqueArgs>(args: SelectSubset<T, ChatActivityFindUniqueArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatActivityFindUniqueOrThrowArgs} args - Arguments to find a ChatActivity
     * @example
     * // Get one ChatActivity
     * const chatActivity = await prisma.chatActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityFindFirstArgs} args - Arguments to find a ChatActivity
     * @example
     * // Get one ChatActivity
     * const chatActivity = await prisma.chatActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatActivityFindFirstArgs>(args?: SelectSubset<T, ChatActivityFindFirstArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityFindFirstOrThrowArgs} args - Arguments to find a ChatActivity
     * @example
     * // Get one ChatActivity
     * const chatActivity = await prisma.chatActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatActivities
     * const chatActivities = await prisma.chatActivity.findMany()
     * 
     * // Get first 10 ChatActivities
     * const chatActivities = await prisma.chatActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatActivityWithIdOnly = await prisma.chatActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatActivityFindManyArgs>(args?: SelectSubset<T, ChatActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatActivity.
     * @param {ChatActivityCreateArgs} args - Arguments to create a ChatActivity.
     * @example
     * // Create one ChatActivity
     * const ChatActivity = await prisma.chatActivity.create({
     *   data: {
     *     // ... data to create a ChatActivity
     *   }
     * })
     * 
     */
    create<T extends ChatActivityCreateArgs>(args: SelectSubset<T, ChatActivityCreateArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatActivities.
     * @param {ChatActivityCreateManyArgs} args - Arguments to create many ChatActivities.
     * @example
     * // Create many ChatActivities
     * const chatActivity = await prisma.chatActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatActivityCreateManyArgs>(args?: SelectSubset<T, ChatActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatActivities and returns the data saved in the database.
     * @param {ChatActivityCreateManyAndReturnArgs} args - Arguments to create many ChatActivities.
     * @example
     * // Create many ChatActivities
     * const chatActivity = await prisma.chatActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatActivities and only return the `id`
     * const chatActivityWithIdOnly = await prisma.chatActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatActivity.
     * @param {ChatActivityDeleteArgs} args - Arguments to delete one ChatActivity.
     * @example
     * // Delete one ChatActivity
     * const ChatActivity = await prisma.chatActivity.delete({
     *   where: {
     *     // ... filter to delete one ChatActivity
     *   }
     * })
     * 
     */
    delete<T extends ChatActivityDeleteArgs>(args: SelectSubset<T, ChatActivityDeleteArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatActivity.
     * @param {ChatActivityUpdateArgs} args - Arguments to update one ChatActivity.
     * @example
     * // Update one ChatActivity
     * const chatActivity = await prisma.chatActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatActivityUpdateArgs>(args: SelectSubset<T, ChatActivityUpdateArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatActivities.
     * @param {ChatActivityDeleteManyArgs} args - Arguments to filter ChatActivities to delete.
     * @example
     * // Delete a few ChatActivities
     * const { count } = await prisma.chatActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatActivityDeleteManyArgs>(args?: SelectSubset<T, ChatActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatActivities
     * const chatActivity = await prisma.chatActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatActivityUpdateManyArgs>(args: SelectSubset<T, ChatActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatActivities and returns the data updated in the database.
     * @param {ChatActivityUpdateManyAndReturnArgs} args - Arguments to update many ChatActivities.
     * @example
     * // Update many ChatActivities
     * const chatActivity = await prisma.chatActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatActivities and only return the `id`
     * const chatActivityWithIdOnly = await prisma.chatActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatActivity.
     * @param {ChatActivityUpsertArgs} args - Arguments to update or create a ChatActivity.
     * @example
     * // Update or create a ChatActivity
     * const chatActivity = await prisma.chatActivity.upsert({
     *   create: {
     *     // ... data to create a ChatActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatActivity we want to update
     *   }
     * })
     */
    upsert<T extends ChatActivityUpsertArgs>(args: SelectSubset<T, ChatActivityUpsertArgs<ExtArgs>>): Prisma__ChatActivityClient<$Result.GetResult<Prisma.$ChatActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityCountArgs} args - Arguments to filter ChatActivities to count.
     * @example
     * // Count the number of ChatActivities
     * const count = await prisma.chatActivity.count({
     *   where: {
     *     // ... the filter for the ChatActivities we want to count
     *   }
     * })
    **/
    count<T extends ChatActivityCountArgs>(
      args?: Subset<T, ChatActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatActivityAggregateArgs>(args: Subset<T, ChatActivityAggregateArgs>): Prisma.PrismaPromise<GetChatActivityAggregateType<T>>

    /**
     * Group by ChatActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatActivityGroupByArgs['orderBy'] }
        : { orderBy?: ChatActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatActivity model
   */
  readonly fields: ChatActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatActivity model
   */
  interface ChatActivityFieldRefs {
    readonly id: FieldRef<"ChatActivity", 'String'>
    readonly date: FieldRef<"ChatActivity", 'String'>
    readonly sajidActive: FieldRef<"ChatActivity", 'Boolean'>
    readonly nasywaActive: FieldRef<"ChatActivity", 'Boolean'>
    readonly messageCount: FieldRef<"ChatActivity", 'Int'>
    readonly createdAt: FieldRef<"ChatActivity", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatActivity findUnique
   */
  export type ChatActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * Filter, which ChatActivity to fetch.
     */
    where: ChatActivityWhereUniqueInput
  }

  /**
   * ChatActivity findUniqueOrThrow
   */
  export type ChatActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * Filter, which ChatActivity to fetch.
     */
    where: ChatActivityWhereUniqueInput
  }

  /**
   * ChatActivity findFirst
   */
  export type ChatActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * Filter, which ChatActivity to fetch.
     */
    where?: ChatActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatActivities to fetch.
     */
    orderBy?: ChatActivityOrderByWithRelationInput | ChatActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatActivities.
     */
    cursor?: ChatActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatActivities.
     */
    distinct?: ChatActivityScalarFieldEnum | ChatActivityScalarFieldEnum[]
  }

  /**
   * ChatActivity findFirstOrThrow
   */
  export type ChatActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * Filter, which ChatActivity to fetch.
     */
    where?: ChatActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatActivities to fetch.
     */
    orderBy?: ChatActivityOrderByWithRelationInput | ChatActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatActivities.
     */
    cursor?: ChatActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatActivities.
     */
    distinct?: ChatActivityScalarFieldEnum | ChatActivityScalarFieldEnum[]
  }

  /**
   * ChatActivity findMany
   */
  export type ChatActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * Filter, which ChatActivities to fetch.
     */
    where?: ChatActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatActivities to fetch.
     */
    orderBy?: ChatActivityOrderByWithRelationInput | ChatActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatActivities.
     */
    cursor?: ChatActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatActivities.
     */
    skip?: number
    distinct?: ChatActivityScalarFieldEnum | ChatActivityScalarFieldEnum[]
  }

  /**
   * ChatActivity create
   */
  export type ChatActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatActivity.
     */
    data: XOR<ChatActivityCreateInput, ChatActivityUncheckedCreateInput>
  }

  /**
   * ChatActivity createMany
   */
  export type ChatActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatActivities.
     */
    data: ChatActivityCreateManyInput | ChatActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatActivity createManyAndReturn
   */
  export type ChatActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * The data used to create many ChatActivities.
     */
    data: ChatActivityCreateManyInput | ChatActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatActivity update
   */
  export type ChatActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatActivity.
     */
    data: XOR<ChatActivityUpdateInput, ChatActivityUncheckedUpdateInput>
    /**
     * Choose, which ChatActivity to update.
     */
    where: ChatActivityWhereUniqueInput
  }

  /**
   * ChatActivity updateMany
   */
  export type ChatActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatActivities.
     */
    data: XOR<ChatActivityUpdateManyMutationInput, ChatActivityUncheckedUpdateManyInput>
    /**
     * Filter which ChatActivities to update
     */
    where?: ChatActivityWhereInput
    /**
     * Limit how many ChatActivities to update.
     */
    limit?: number
  }

  /**
   * ChatActivity updateManyAndReturn
   */
  export type ChatActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * The data used to update ChatActivities.
     */
    data: XOR<ChatActivityUpdateManyMutationInput, ChatActivityUncheckedUpdateManyInput>
    /**
     * Filter which ChatActivities to update
     */
    where?: ChatActivityWhereInput
    /**
     * Limit how many ChatActivities to update.
     */
    limit?: number
  }

  /**
   * ChatActivity upsert
   */
  export type ChatActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatActivity to update in case it exists.
     */
    where: ChatActivityWhereUniqueInput
    /**
     * In case the ChatActivity found by the `where` argument doesn't exist, create a new ChatActivity with this data.
     */
    create: XOR<ChatActivityCreateInput, ChatActivityUncheckedCreateInput>
    /**
     * In case the ChatActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatActivityUpdateInput, ChatActivityUncheckedUpdateInput>
  }

  /**
   * ChatActivity delete
   */
  export type ChatActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
    /**
     * Filter which ChatActivity to delete.
     */
    where: ChatActivityWhereUniqueInput
  }

  /**
   * ChatActivity deleteMany
   */
  export type ChatActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatActivities to delete
     */
    where?: ChatActivityWhereInput
    /**
     * Limit how many ChatActivities to delete.
     */
    limit?: number
  }

  /**
   * ChatActivity without action
   */
  export type ChatActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatActivity
     */
    select?: ChatActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatActivity
     */
    omit?: ChatActivityOmit<ExtArgs> | null
  }


  /**
   * Model PlaylistSong
   */

  export type AggregatePlaylistSong = {
    _count: PlaylistSongCountAggregateOutputType | null
    _avg: PlaylistSongAvgAggregateOutputType | null
    _sum: PlaylistSongSumAggregateOutputType | null
    _min: PlaylistSongMinAggregateOutputType | null
    _max: PlaylistSongMaxAggregateOutputType | null
  }

  export type PlaylistSongAvgAggregateOutputType = {
    order: number | null
  }

  export type PlaylistSongSumAggregateOutputType = {
    order: number | null
  }

  export type PlaylistSongMinAggregateOutputType = {
    id: string | null
    url: string | null
    title: string | null
    effect: string | null
    chatKey: string | null
    order: number | null
    createdAt: Date | null
  }

  export type PlaylistSongMaxAggregateOutputType = {
    id: string | null
    url: string | null
    title: string | null
    effect: string | null
    chatKey: string | null
    order: number | null
    createdAt: Date | null
  }

  export type PlaylistSongCountAggregateOutputType = {
    id: number
    url: number
    title: number
    effect: number
    chatKey: number
    order: number
    createdAt: number
    _all: number
  }


  export type PlaylistSongAvgAggregateInputType = {
    order?: true
  }

  export type PlaylistSongSumAggregateInputType = {
    order?: true
  }

  export type PlaylistSongMinAggregateInputType = {
    id?: true
    url?: true
    title?: true
    effect?: true
    chatKey?: true
    order?: true
    createdAt?: true
  }

  export type PlaylistSongMaxAggregateInputType = {
    id?: true
    url?: true
    title?: true
    effect?: true
    chatKey?: true
    order?: true
    createdAt?: true
  }

  export type PlaylistSongCountAggregateInputType = {
    id?: true
    url?: true
    title?: true
    effect?: true
    chatKey?: true
    order?: true
    createdAt?: true
    _all?: true
  }

  export type PlaylistSongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaylistSong to aggregate.
     */
    where?: PlaylistSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistSongs to fetch.
     */
    orderBy?: PlaylistSongOrderByWithRelationInput | PlaylistSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistSongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlaylistSongs
    **/
    _count?: true | PlaylistSongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaylistSongAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaylistSongSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistSongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistSongMaxAggregateInputType
  }

  export type GetPlaylistSongAggregateType<T extends PlaylistSongAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylistSong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylistSong[P]>
      : GetScalarType<T[P], AggregatePlaylistSong[P]>
  }




  export type PlaylistSongGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistSongWhereInput
    orderBy?: PlaylistSongOrderByWithAggregationInput | PlaylistSongOrderByWithAggregationInput[]
    by: PlaylistSongScalarFieldEnum[] | PlaylistSongScalarFieldEnum
    having?: PlaylistSongScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistSongCountAggregateInputType | true
    _avg?: PlaylistSongAvgAggregateInputType
    _sum?: PlaylistSongSumAggregateInputType
    _min?: PlaylistSongMinAggregateInputType
    _max?: PlaylistSongMaxAggregateInputType
  }

  export type PlaylistSongGroupByOutputType = {
    id: string
    url: string
    title: string
    effect: string
    chatKey: string
    order: number
    createdAt: Date
    _count: PlaylistSongCountAggregateOutputType | null
    _avg: PlaylistSongAvgAggregateOutputType | null
    _sum: PlaylistSongSumAggregateOutputType | null
    _min: PlaylistSongMinAggregateOutputType | null
    _max: PlaylistSongMaxAggregateOutputType | null
  }

  type GetPlaylistSongGroupByPayload<T extends PlaylistSongGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistSongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistSongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistSongGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistSongGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistSongSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    effect?: boolean
    chatKey?: boolean
    order?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["playlistSong"]>

  export type PlaylistSongSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    effect?: boolean
    chatKey?: boolean
    order?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["playlistSong"]>

  export type PlaylistSongSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    effect?: boolean
    chatKey?: boolean
    order?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["playlistSong"]>

  export type PlaylistSongSelectScalar = {
    id?: boolean
    url?: boolean
    title?: boolean
    effect?: boolean
    chatKey?: boolean
    order?: boolean
    createdAt?: boolean
  }

  export type PlaylistSongOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "title" | "effect" | "chatKey" | "order" | "createdAt", ExtArgs["result"]["playlistSong"]>

  export type $PlaylistSongPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlaylistSong"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      title: string
      effect: string
      chatKey: string
      order: number
      createdAt: Date
    }, ExtArgs["result"]["playlistSong"]>
    composites: {}
  }

  type PlaylistSongGetPayload<S extends boolean | null | undefined | PlaylistSongDefaultArgs> = $Result.GetResult<Prisma.$PlaylistSongPayload, S>

  type PlaylistSongCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaylistSongFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaylistSongCountAggregateInputType | true
    }

  export interface PlaylistSongDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlaylistSong'], meta: { name: 'PlaylistSong' } }
    /**
     * Find zero or one PlaylistSong that matches the filter.
     * @param {PlaylistSongFindUniqueArgs} args - Arguments to find a PlaylistSong
     * @example
     * // Get one PlaylistSong
     * const playlistSong = await prisma.playlistSong.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistSongFindUniqueArgs>(args: SelectSubset<T, PlaylistSongFindUniqueArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlaylistSong that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaylistSongFindUniqueOrThrowArgs} args - Arguments to find a PlaylistSong
     * @example
     * // Get one PlaylistSong
     * const playlistSong = await prisma.playlistSong.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistSongFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistSongFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaylistSong that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongFindFirstArgs} args - Arguments to find a PlaylistSong
     * @example
     * // Get one PlaylistSong
     * const playlistSong = await prisma.playlistSong.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistSongFindFirstArgs>(args?: SelectSubset<T, PlaylistSongFindFirstArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaylistSong that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongFindFirstOrThrowArgs} args - Arguments to find a PlaylistSong
     * @example
     * // Get one PlaylistSong
     * const playlistSong = await prisma.playlistSong.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistSongFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistSongFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlaylistSongs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlaylistSongs
     * const playlistSongs = await prisma.playlistSong.findMany()
     * 
     * // Get first 10 PlaylistSongs
     * const playlistSongs = await prisma.playlistSong.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistSongWithIdOnly = await prisma.playlistSong.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaylistSongFindManyArgs>(args?: SelectSubset<T, PlaylistSongFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlaylistSong.
     * @param {PlaylistSongCreateArgs} args - Arguments to create a PlaylistSong.
     * @example
     * // Create one PlaylistSong
     * const PlaylistSong = await prisma.playlistSong.create({
     *   data: {
     *     // ... data to create a PlaylistSong
     *   }
     * })
     * 
     */
    create<T extends PlaylistSongCreateArgs>(args: SelectSubset<T, PlaylistSongCreateArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlaylistSongs.
     * @param {PlaylistSongCreateManyArgs} args - Arguments to create many PlaylistSongs.
     * @example
     * // Create many PlaylistSongs
     * const playlistSong = await prisma.playlistSong.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistSongCreateManyArgs>(args?: SelectSubset<T, PlaylistSongCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlaylistSongs and returns the data saved in the database.
     * @param {PlaylistSongCreateManyAndReturnArgs} args - Arguments to create many PlaylistSongs.
     * @example
     * // Create many PlaylistSongs
     * const playlistSong = await prisma.playlistSong.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlaylistSongs and only return the `id`
     * const playlistSongWithIdOnly = await prisma.playlistSong.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaylistSongCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaylistSongCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlaylistSong.
     * @param {PlaylistSongDeleteArgs} args - Arguments to delete one PlaylistSong.
     * @example
     * // Delete one PlaylistSong
     * const PlaylistSong = await prisma.playlistSong.delete({
     *   where: {
     *     // ... filter to delete one PlaylistSong
     *   }
     * })
     * 
     */
    delete<T extends PlaylistSongDeleteArgs>(args: SelectSubset<T, PlaylistSongDeleteArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlaylistSong.
     * @param {PlaylistSongUpdateArgs} args - Arguments to update one PlaylistSong.
     * @example
     * // Update one PlaylistSong
     * const playlistSong = await prisma.playlistSong.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistSongUpdateArgs>(args: SelectSubset<T, PlaylistSongUpdateArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlaylistSongs.
     * @param {PlaylistSongDeleteManyArgs} args - Arguments to filter PlaylistSongs to delete.
     * @example
     * // Delete a few PlaylistSongs
     * const { count } = await prisma.playlistSong.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistSongDeleteManyArgs>(args?: SelectSubset<T, PlaylistSongDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaylistSongs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlaylistSongs
     * const playlistSong = await prisma.playlistSong.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistSongUpdateManyArgs>(args: SelectSubset<T, PlaylistSongUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaylistSongs and returns the data updated in the database.
     * @param {PlaylistSongUpdateManyAndReturnArgs} args - Arguments to update many PlaylistSongs.
     * @example
     * // Update many PlaylistSongs
     * const playlistSong = await prisma.playlistSong.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlaylistSongs and only return the `id`
     * const playlistSongWithIdOnly = await prisma.playlistSong.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaylistSongUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaylistSongUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlaylistSong.
     * @param {PlaylistSongUpsertArgs} args - Arguments to update or create a PlaylistSong.
     * @example
     * // Update or create a PlaylistSong
     * const playlistSong = await prisma.playlistSong.upsert({
     *   create: {
     *     // ... data to create a PlaylistSong
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlaylistSong we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistSongUpsertArgs>(args: SelectSubset<T, PlaylistSongUpsertArgs<ExtArgs>>): Prisma__PlaylistSongClient<$Result.GetResult<Prisma.$PlaylistSongPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlaylistSongs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongCountArgs} args - Arguments to filter PlaylistSongs to count.
     * @example
     * // Count the number of PlaylistSongs
     * const count = await prisma.playlistSong.count({
     *   where: {
     *     // ... the filter for the PlaylistSongs we want to count
     *   }
     * })
    **/
    count<T extends PlaylistSongCountArgs>(
      args?: Subset<T, PlaylistSongCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistSongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlaylistSong.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaylistSongAggregateArgs>(args: Subset<T, PlaylistSongAggregateArgs>): Prisma.PrismaPromise<GetPlaylistSongAggregateType<T>>

    /**
     * Group by PlaylistSong.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistSongGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaylistSongGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistSongGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistSongGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaylistSongGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistSongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlaylistSong model
   */
  readonly fields: PlaylistSongFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlaylistSong.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistSongClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlaylistSong model
   */
  interface PlaylistSongFieldRefs {
    readonly id: FieldRef<"PlaylistSong", 'String'>
    readonly url: FieldRef<"PlaylistSong", 'String'>
    readonly title: FieldRef<"PlaylistSong", 'String'>
    readonly effect: FieldRef<"PlaylistSong", 'String'>
    readonly chatKey: FieldRef<"PlaylistSong", 'String'>
    readonly order: FieldRef<"PlaylistSong", 'Int'>
    readonly createdAt: FieldRef<"PlaylistSong", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlaylistSong findUnique
   */
  export type PlaylistSongFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * Filter, which PlaylistSong to fetch.
     */
    where: PlaylistSongWhereUniqueInput
  }

  /**
   * PlaylistSong findUniqueOrThrow
   */
  export type PlaylistSongFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * Filter, which PlaylistSong to fetch.
     */
    where: PlaylistSongWhereUniqueInput
  }

  /**
   * PlaylistSong findFirst
   */
  export type PlaylistSongFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * Filter, which PlaylistSong to fetch.
     */
    where?: PlaylistSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistSongs to fetch.
     */
    orderBy?: PlaylistSongOrderByWithRelationInput | PlaylistSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaylistSongs.
     */
    cursor?: PlaylistSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistSongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistSongs.
     */
    distinct?: PlaylistSongScalarFieldEnum | PlaylistSongScalarFieldEnum[]
  }

  /**
   * PlaylistSong findFirstOrThrow
   */
  export type PlaylistSongFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * Filter, which PlaylistSong to fetch.
     */
    where?: PlaylistSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistSongs to fetch.
     */
    orderBy?: PlaylistSongOrderByWithRelationInput | PlaylistSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaylistSongs.
     */
    cursor?: PlaylistSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistSongs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistSongs.
     */
    distinct?: PlaylistSongScalarFieldEnum | PlaylistSongScalarFieldEnum[]
  }

  /**
   * PlaylistSong findMany
   */
  export type PlaylistSongFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * Filter, which PlaylistSongs to fetch.
     */
    where?: PlaylistSongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistSongs to fetch.
     */
    orderBy?: PlaylistSongOrderByWithRelationInput | PlaylistSongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlaylistSongs.
     */
    cursor?: PlaylistSongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistSongs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistSongs.
     */
    skip?: number
    distinct?: PlaylistSongScalarFieldEnum | PlaylistSongScalarFieldEnum[]
  }

  /**
   * PlaylistSong create
   */
  export type PlaylistSongCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * The data needed to create a PlaylistSong.
     */
    data: XOR<PlaylistSongCreateInput, PlaylistSongUncheckedCreateInput>
  }

  /**
   * PlaylistSong createMany
   */
  export type PlaylistSongCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlaylistSongs.
     */
    data: PlaylistSongCreateManyInput | PlaylistSongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaylistSong createManyAndReturn
   */
  export type PlaylistSongCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * The data used to create many PlaylistSongs.
     */
    data: PlaylistSongCreateManyInput | PlaylistSongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaylistSong update
   */
  export type PlaylistSongUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * The data needed to update a PlaylistSong.
     */
    data: XOR<PlaylistSongUpdateInput, PlaylistSongUncheckedUpdateInput>
    /**
     * Choose, which PlaylistSong to update.
     */
    where: PlaylistSongWhereUniqueInput
  }

  /**
   * PlaylistSong updateMany
   */
  export type PlaylistSongUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlaylistSongs.
     */
    data: XOR<PlaylistSongUpdateManyMutationInput, PlaylistSongUncheckedUpdateManyInput>
    /**
     * Filter which PlaylistSongs to update
     */
    where?: PlaylistSongWhereInput
    /**
     * Limit how many PlaylistSongs to update.
     */
    limit?: number
  }

  /**
   * PlaylistSong updateManyAndReturn
   */
  export type PlaylistSongUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * The data used to update PlaylistSongs.
     */
    data: XOR<PlaylistSongUpdateManyMutationInput, PlaylistSongUncheckedUpdateManyInput>
    /**
     * Filter which PlaylistSongs to update
     */
    where?: PlaylistSongWhereInput
    /**
     * Limit how many PlaylistSongs to update.
     */
    limit?: number
  }

  /**
   * PlaylistSong upsert
   */
  export type PlaylistSongUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * The filter to search for the PlaylistSong to update in case it exists.
     */
    where: PlaylistSongWhereUniqueInput
    /**
     * In case the PlaylistSong found by the `where` argument doesn't exist, create a new PlaylistSong with this data.
     */
    create: XOR<PlaylistSongCreateInput, PlaylistSongUncheckedCreateInput>
    /**
     * In case the PlaylistSong was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistSongUpdateInput, PlaylistSongUncheckedUpdateInput>
  }

  /**
   * PlaylistSong delete
   */
  export type PlaylistSongDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
    /**
     * Filter which PlaylistSong to delete.
     */
    where: PlaylistSongWhereUniqueInput
  }

  /**
   * PlaylistSong deleteMany
   */
  export type PlaylistSongDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaylistSongs to delete
     */
    where?: PlaylistSongWhereInput
    /**
     * Limit how many PlaylistSongs to delete.
     */
    limit?: number
  }

  /**
   * PlaylistSong without action
   */
  export type PlaylistSongDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistSong
     */
    select?: PlaylistSongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaylistSong
     */
    omit?: PlaylistSongOmit<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    text: string | null
    imageUrl: string | null
    sender: string | null
    status: string | null
    date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    text: string | null
    imageUrl: string | null
    sender: string | null
    status: string | null
    date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    text: number
    imageUrl: number
    sender: number
    status: number
    date: number
    createdAt: number
    updatedAt: number
    reactions: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    sender?: true
    status?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    sender?: true
    status?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    text?: true
    imageUrl?: true
    sender?: true
    status?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    reactions?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    text: string
    imageUrl: string | null
    sender: string
    status: string
    date: string
    createdAt: Date
    updatedAt: Date
    reactions: JsonValue | null
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    sender?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reactions?: boolean
    comments?: boolean | Activity$commentsArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    sender?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reactions?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    sender?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reactions?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    text?: boolean
    imageUrl?: boolean
    sender?: boolean
    status?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reactions?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "imageUrl" | "sender" | "status" | "date" | "createdAt" | "updatedAt" | "reactions", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | Activity$commentsArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      comments: Prisma.$ActivityCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      imageUrl: string | null
      sender: string
      status: string
      date: string
      createdAt: Date
      updatedAt: Date
      reactions: Prisma.JsonValue | null
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends Activity$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Activity$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly text: FieldRef<"Activity", 'String'>
    readonly imageUrl: FieldRef<"Activity", 'String'>
    readonly sender: FieldRef<"Activity", 'String'>
    readonly status: FieldRef<"Activity", 'String'>
    readonly date: FieldRef<"Activity", 'String'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
    readonly updatedAt: FieldRef<"Activity", 'DateTime'>
    readonly reactions: FieldRef<"Activity", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.comments
   */
  export type Activity$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    where?: ActivityCommentWhereInput
    orderBy?: ActivityCommentOrderByWithRelationInput | ActivityCommentOrderByWithRelationInput[]
    cursor?: ActivityCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityCommentScalarFieldEnum | ActivityCommentScalarFieldEnum[]
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model ActivityComment
   */

  export type AggregateActivityComment = {
    _count: ActivityCommentCountAggregateOutputType | null
    _min: ActivityCommentMinAggregateOutputType | null
    _max: ActivityCommentMaxAggregateOutputType | null
  }

  export type ActivityCommentMinAggregateOutputType = {
    id: string | null
    text: string | null
    sender: string | null
    activityId: string | null
    createdAt: Date | null
  }

  export type ActivityCommentMaxAggregateOutputType = {
    id: string | null
    text: string | null
    sender: string | null
    activityId: string | null
    createdAt: Date | null
  }

  export type ActivityCommentCountAggregateOutputType = {
    id: number
    text: number
    sender: number
    activityId: number
    createdAt: number
    _all: number
  }


  export type ActivityCommentMinAggregateInputType = {
    id?: true
    text?: true
    sender?: true
    activityId?: true
    createdAt?: true
  }

  export type ActivityCommentMaxAggregateInputType = {
    id?: true
    text?: true
    sender?: true
    activityId?: true
    createdAt?: true
  }

  export type ActivityCommentCountAggregateInputType = {
    id?: true
    text?: true
    sender?: true
    activityId?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityComment to aggregate.
     */
    where?: ActivityCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityComments to fetch.
     */
    orderBy?: ActivityCommentOrderByWithRelationInput | ActivityCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityComments
    **/
    _count?: true | ActivityCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityCommentMaxAggregateInputType
  }

  export type GetActivityCommentAggregateType<T extends ActivityCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityComment[P]>
      : GetScalarType<T[P], AggregateActivityComment[P]>
  }




  export type ActivityCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityCommentWhereInput
    orderBy?: ActivityCommentOrderByWithAggregationInput | ActivityCommentOrderByWithAggregationInput[]
    by: ActivityCommentScalarFieldEnum[] | ActivityCommentScalarFieldEnum
    having?: ActivityCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCommentCountAggregateInputType | true
    _min?: ActivityCommentMinAggregateInputType
    _max?: ActivityCommentMaxAggregateInputType
  }

  export type ActivityCommentGroupByOutputType = {
    id: string
    text: string
    sender: string
    activityId: string
    createdAt: Date
    _count: ActivityCommentCountAggregateOutputType | null
    _min: ActivityCommentMinAggregateOutputType | null
    _max: ActivityCommentMaxAggregateOutputType | null
  }

  type GetActivityCommentGroupByPayload<T extends ActivityCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityCommentGroupByOutputType[P]>
        }
      >
    >


  export type ActivityCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    sender?: boolean
    activityId?: boolean
    createdAt?: boolean
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityComment"]>

  export type ActivityCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    sender?: boolean
    activityId?: boolean
    createdAt?: boolean
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityComment"]>

  export type ActivityCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    sender?: boolean
    activityId?: boolean
    createdAt?: boolean
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityComment"]>

  export type ActivityCommentSelectScalar = {
    id?: boolean
    text?: boolean
    sender?: boolean
    activityId?: boolean
    createdAt?: boolean
  }

  export type ActivityCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "sender" | "activityId" | "createdAt", ExtArgs["result"]["activityComment"]>
  export type ActivityCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }
  export type ActivityCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }
  export type ActivityCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }

  export type $ActivityCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityComment"
    objects: {
      activity: Prisma.$ActivityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      sender: string
      activityId: string
      createdAt: Date
    }, ExtArgs["result"]["activityComment"]>
    composites: {}
  }

  type ActivityCommentGetPayload<S extends boolean | null | undefined | ActivityCommentDefaultArgs> = $Result.GetResult<Prisma.$ActivityCommentPayload, S>

  type ActivityCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCommentCountAggregateInputType | true
    }

  export interface ActivityCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityComment'], meta: { name: 'ActivityComment' } }
    /**
     * Find zero or one ActivityComment that matches the filter.
     * @param {ActivityCommentFindUniqueArgs} args - Arguments to find a ActivityComment
     * @example
     * // Get one ActivityComment
     * const activityComment = await prisma.activityComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityCommentFindUniqueArgs>(args: SelectSubset<T, ActivityCommentFindUniqueArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityCommentFindUniqueOrThrowArgs} args - Arguments to find a ActivityComment
     * @example
     * // Get one ActivityComment
     * const activityComment = await prisma.activityComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentFindFirstArgs} args - Arguments to find a ActivityComment
     * @example
     * // Get one ActivityComment
     * const activityComment = await prisma.activityComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityCommentFindFirstArgs>(args?: SelectSubset<T, ActivityCommentFindFirstArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentFindFirstOrThrowArgs} args - Arguments to find a ActivityComment
     * @example
     * // Get one ActivityComment
     * const activityComment = await prisma.activityComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityComments
     * const activityComments = await prisma.activityComment.findMany()
     * 
     * // Get first 10 ActivityComments
     * const activityComments = await prisma.activityComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityCommentWithIdOnly = await prisma.activityComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityCommentFindManyArgs>(args?: SelectSubset<T, ActivityCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityComment.
     * @param {ActivityCommentCreateArgs} args - Arguments to create a ActivityComment.
     * @example
     * // Create one ActivityComment
     * const ActivityComment = await prisma.activityComment.create({
     *   data: {
     *     // ... data to create a ActivityComment
     *   }
     * })
     * 
     */
    create<T extends ActivityCommentCreateArgs>(args: SelectSubset<T, ActivityCommentCreateArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityComments.
     * @param {ActivityCommentCreateManyArgs} args - Arguments to create many ActivityComments.
     * @example
     * // Create many ActivityComments
     * const activityComment = await prisma.activityComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCommentCreateManyArgs>(args?: SelectSubset<T, ActivityCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityComments and returns the data saved in the database.
     * @param {ActivityCommentCreateManyAndReturnArgs} args - Arguments to create many ActivityComments.
     * @example
     * // Create many ActivityComments
     * const activityComment = await prisma.activityComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityComments and only return the `id`
     * const activityCommentWithIdOnly = await prisma.activityComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityComment.
     * @param {ActivityCommentDeleteArgs} args - Arguments to delete one ActivityComment.
     * @example
     * // Delete one ActivityComment
     * const ActivityComment = await prisma.activityComment.delete({
     *   where: {
     *     // ... filter to delete one ActivityComment
     *   }
     * })
     * 
     */
    delete<T extends ActivityCommentDeleteArgs>(args: SelectSubset<T, ActivityCommentDeleteArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityComment.
     * @param {ActivityCommentUpdateArgs} args - Arguments to update one ActivityComment.
     * @example
     * // Update one ActivityComment
     * const activityComment = await prisma.activityComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityCommentUpdateArgs>(args: SelectSubset<T, ActivityCommentUpdateArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityComments.
     * @param {ActivityCommentDeleteManyArgs} args - Arguments to filter ActivityComments to delete.
     * @example
     * // Delete a few ActivityComments
     * const { count } = await prisma.activityComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityCommentDeleteManyArgs>(args?: SelectSubset<T, ActivityCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityComments
     * const activityComment = await prisma.activityComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityCommentUpdateManyArgs>(args: SelectSubset<T, ActivityCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityComments and returns the data updated in the database.
     * @param {ActivityCommentUpdateManyAndReturnArgs} args - Arguments to update many ActivityComments.
     * @example
     * // Update many ActivityComments
     * const activityComment = await prisma.activityComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityComments and only return the `id`
     * const activityCommentWithIdOnly = await prisma.activityComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityComment.
     * @param {ActivityCommentUpsertArgs} args - Arguments to update or create a ActivityComment.
     * @example
     * // Update or create a ActivityComment
     * const activityComment = await prisma.activityComment.upsert({
     *   create: {
     *     // ... data to create a ActivityComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityComment we want to update
     *   }
     * })
     */
    upsert<T extends ActivityCommentUpsertArgs>(args: SelectSubset<T, ActivityCommentUpsertArgs<ExtArgs>>): Prisma__ActivityCommentClient<$Result.GetResult<Prisma.$ActivityCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentCountArgs} args - Arguments to filter ActivityComments to count.
     * @example
     * // Count the number of ActivityComments
     * const count = await prisma.activityComment.count({
     *   where: {
     *     // ... the filter for the ActivityComments we want to count
     *   }
     * })
    **/
    count<T extends ActivityCommentCountArgs>(
      args?: Subset<T, ActivityCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityCommentAggregateArgs>(args: Subset<T, ActivityCommentAggregateArgs>): Prisma.PrismaPromise<GetActivityCommentAggregateType<T>>

    /**
     * Group by ActivityComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityCommentGroupByArgs['orderBy'] }
        : { orderBy?: ActivityCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityComment model
   */
  readonly fields: ActivityCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activity<T extends ActivityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ActivityDefaultArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityComment model
   */
  interface ActivityCommentFieldRefs {
    readonly id: FieldRef<"ActivityComment", 'String'>
    readonly text: FieldRef<"ActivityComment", 'String'>
    readonly sender: FieldRef<"ActivityComment", 'String'>
    readonly activityId: FieldRef<"ActivityComment", 'String'>
    readonly createdAt: FieldRef<"ActivityComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityComment findUnique
   */
  export type ActivityCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * Filter, which ActivityComment to fetch.
     */
    where: ActivityCommentWhereUniqueInput
  }

  /**
   * ActivityComment findUniqueOrThrow
   */
  export type ActivityCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * Filter, which ActivityComment to fetch.
     */
    where: ActivityCommentWhereUniqueInput
  }

  /**
   * ActivityComment findFirst
   */
  export type ActivityCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * Filter, which ActivityComment to fetch.
     */
    where?: ActivityCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityComments to fetch.
     */
    orderBy?: ActivityCommentOrderByWithRelationInput | ActivityCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityComments.
     */
    cursor?: ActivityCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityComments.
     */
    distinct?: ActivityCommentScalarFieldEnum | ActivityCommentScalarFieldEnum[]
  }

  /**
   * ActivityComment findFirstOrThrow
   */
  export type ActivityCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * Filter, which ActivityComment to fetch.
     */
    where?: ActivityCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityComments to fetch.
     */
    orderBy?: ActivityCommentOrderByWithRelationInput | ActivityCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityComments.
     */
    cursor?: ActivityCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityComments.
     */
    distinct?: ActivityCommentScalarFieldEnum | ActivityCommentScalarFieldEnum[]
  }

  /**
   * ActivityComment findMany
   */
  export type ActivityCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * Filter, which ActivityComments to fetch.
     */
    where?: ActivityCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityComments to fetch.
     */
    orderBy?: ActivityCommentOrderByWithRelationInput | ActivityCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityComments.
     */
    cursor?: ActivityCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityComments.
     */
    skip?: number
    distinct?: ActivityCommentScalarFieldEnum | ActivityCommentScalarFieldEnum[]
  }

  /**
   * ActivityComment create
   */
  export type ActivityCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityComment.
     */
    data: XOR<ActivityCommentCreateInput, ActivityCommentUncheckedCreateInput>
  }

  /**
   * ActivityComment createMany
   */
  export type ActivityCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityComments.
     */
    data: ActivityCommentCreateManyInput | ActivityCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityComment createManyAndReturn
   */
  export type ActivityCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityComments.
     */
    data: ActivityCommentCreateManyInput | ActivityCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityComment update
   */
  export type ActivityCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityComment.
     */
    data: XOR<ActivityCommentUpdateInput, ActivityCommentUncheckedUpdateInput>
    /**
     * Choose, which ActivityComment to update.
     */
    where: ActivityCommentWhereUniqueInput
  }

  /**
   * ActivityComment updateMany
   */
  export type ActivityCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityComments.
     */
    data: XOR<ActivityCommentUpdateManyMutationInput, ActivityCommentUncheckedUpdateManyInput>
    /**
     * Filter which ActivityComments to update
     */
    where?: ActivityCommentWhereInput
    /**
     * Limit how many ActivityComments to update.
     */
    limit?: number
  }

  /**
   * ActivityComment updateManyAndReturn
   */
  export type ActivityCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * The data used to update ActivityComments.
     */
    data: XOR<ActivityCommentUpdateManyMutationInput, ActivityCommentUncheckedUpdateManyInput>
    /**
     * Filter which ActivityComments to update
     */
    where?: ActivityCommentWhereInput
    /**
     * Limit how many ActivityComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityComment upsert
   */
  export type ActivityCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityComment to update in case it exists.
     */
    where: ActivityCommentWhereUniqueInput
    /**
     * In case the ActivityComment found by the `where` argument doesn't exist, create a new ActivityComment with this data.
     */
    create: XOR<ActivityCommentCreateInput, ActivityCommentUncheckedCreateInput>
    /**
     * In case the ActivityComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityCommentUpdateInput, ActivityCommentUncheckedUpdateInput>
  }

  /**
   * ActivityComment delete
   */
  export type ActivityCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
    /**
     * Filter which ActivityComment to delete.
     */
    where: ActivityCommentWhereUniqueInput
  }

  /**
   * ActivityComment deleteMany
   */
  export type ActivityCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityComments to delete
     */
    where?: ActivityCommentWhereInput
    /**
     * Limit how many ActivityComments to delete.
     */
    limit?: number
  }

  /**
   * ActivityComment without action
   */
  export type ActivityCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityComment
     */
    select?: ActivityCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityComment
     */
    omit?: ActivityCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityCommentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    key: 'key',
    status: 'status',
    usage: 'usage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    role: 'role',
    name: 'name',
    email: 'email',
    avatarUrl: 'avatarUrl',
    mood: 'mood',
    moodUpdatedAt: 'moodUpdatedAt',
    latitude: 'latitude',
    longitude: 'longitude',
    trackName: 'trackName',
    trackArtist: 'trackArtist',
    trackImage: 'trackImage',
    isPlaying: 'isPlaying',
    ourSongUrl: 'ourSongUrl',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    text: 'text',
    translation: 'translation',
    hindiTranslation: 'hindiTranslation',
    sender: 'sender',
    receiver: 'receiver',
    chatKey: 'chatKey',
    status: 'status',
    type: 'type',
    wordBreakdown: 'wordBreakdown',
    imageUrl: 'imageUrl',
    audioUrl: 'audioUrl',
    unlockAt: 'unlockAt',
    isPinned: 'isPinned',
    parentId: 'parentId',
    reactions: 'reactions',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const ThreadCommentScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    content: 'content',
    author: 'author',
    createdAt: 'createdAt'
  };

  export type ThreadCommentScalarFieldEnum = (typeof ThreadCommentScalarFieldEnum)[keyof typeof ThreadCommentScalarFieldEnum]


  export const GlobalSettingsScalarFieldEnum: {
    id: 'id',
    stopEffects: 'stopEffects',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt'
  };

  export type GlobalSettingsScalarFieldEnum = (typeof GlobalSettingsScalarFieldEnum)[keyof typeof GlobalSettingsScalarFieldEnum]


  export const JarNoteScalarFieldEnum: {
    id: 'id',
    content: 'content',
    author: 'author',
    createdAt: 'createdAt'
  };

  export type JarNoteScalarFieldEnum = (typeof JarNoteScalarFieldEnum)[keyof typeof JarNoteScalarFieldEnum]


  export const LoveNoteScalarFieldEnum: {
    id: 'id',
    content: 'content',
    imageUrl: 'imageUrl',
    sender: 'sender',
    x: 'x',
    y: 'y',
    rotation: 'rotation',
    createdAt: 'createdAt'
  };

  export type LoveNoteScalarFieldEnum = (typeof LoveNoteScalarFieldEnum)[keyof typeof LoveNoteScalarFieldEnum]


  export const MilestoneScalarFieldEnum: {
    id: 'id',
    title: 'title',
    date: 'date',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type MilestoneScalarFieldEnum = (typeof MilestoneScalarFieldEnum)[keyof typeof MilestoneScalarFieldEnum]


  export const LoginHistoryScalarFieldEnum: {
    id: 'id',
    role: 'role',
    timestamp: 'timestamp'
  };

  export type LoginHistoryScalarFieldEnum = (typeof LoginHistoryScalarFieldEnum)[keyof typeof LoginHistoryScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    cloudinaryId: 'cloudinaryId',
    url: 'url',
    sender: 'sender',
    receiver: 'receiver',
    viewType: 'viewType',
    viewed: 'viewed',
    createdAt: 'createdAt'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const ChatActivityScalarFieldEnum: {
    id: 'id',
    date: 'date',
    sajidActive: 'sajidActive',
    nasywaActive: 'nasywaActive',
    messageCount: 'messageCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatActivityScalarFieldEnum = (typeof ChatActivityScalarFieldEnum)[keyof typeof ChatActivityScalarFieldEnum]


  export const PlaylistSongScalarFieldEnum: {
    id: 'id',
    url: 'url',
    title: 'title',
    effect: 'effect',
    chatKey: 'chatKey',
    order: 'order',
    createdAt: 'createdAt'
  };

  export type PlaylistSongScalarFieldEnum = (typeof PlaylistSongScalarFieldEnum)[keyof typeof PlaylistSongScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    text: 'text',
    imageUrl: 'imageUrl',
    sender: 'sender',
    status: 'status',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    reactions: 'reactions'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const ActivityCommentScalarFieldEnum: {
    id: 'id',
    text: 'text',
    sender: 'sender',
    activityId: 'activityId',
    createdAt: 'createdAt'
  };

  export type ActivityCommentScalarFieldEnum = (typeof ActivityCommentScalarFieldEnum)[keyof typeof ActivityCommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    status?: StringFilter<"ApiKey"> | string
    usage?: IntFilter<"ApiKey"> | number
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    status?: SortOrder
    usage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    status?: StringFilter<"ApiKey"> | string
    usage?: IntFilter<"ApiKey"> | number
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }, "id" | "key">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    status?: SortOrder
    usage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _avg?: ApiKeyAvgOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
    _sum?: ApiKeySumOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    key?: StringWithAggregatesFilter<"ApiKey"> | string
    status?: StringWithAggregatesFilter<"ApiKey"> | string
    usage?: IntWithAggregatesFilter<"ApiKey"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    role?: StringFilter<"Profile"> | string
    name?: StringFilter<"Profile"> | string
    email?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    mood?: StringNullableFilter<"Profile"> | string | null
    moodUpdatedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    latitude?: FloatNullableFilter<"Profile"> | number | null
    longitude?: FloatNullableFilter<"Profile"> | number | null
    trackName?: StringNullableFilter<"Profile"> | string | null
    trackArtist?: StringNullableFilter<"Profile"> | string | null
    trackImage?: StringNullableFilter<"Profile"> | string | null
    isPlaying?: BoolFilter<"Profile"> | boolean
    ourSongUrl?: StringNullableFilter<"Profile"> | string | null
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    moodUpdatedAt?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    trackName?: SortOrderInput | SortOrder
    trackArtist?: SortOrderInput | SortOrder
    trackImage?: SortOrderInput | SortOrder
    isPlaying?: SortOrder
    ourSongUrl?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    role?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    name?: StringFilter<"Profile"> | string
    email?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    mood?: StringNullableFilter<"Profile"> | string | null
    moodUpdatedAt?: DateTimeNullableFilter<"Profile"> | Date | string | null
    latitude?: FloatNullableFilter<"Profile"> | number | null
    longitude?: FloatNullableFilter<"Profile"> | number | null
    trackName?: StringNullableFilter<"Profile"> | string | null
    trackArtist?: StringNullableFilter<"Profile"> | string | null
    trackImage?: StringNullableFilter<"Profile"> | string | null
    isPlaying?: BoolFilter<"Profile"> | boolean
    ourSongUrl?: StringNullableFilter<"Profile"> | string | null
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
  }, "id" | "role">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    moodUpdatedAt?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    trackName?: SortOrderInput | SortOrder
    trackArtist?: SortOrderInput | SortOrder
    trackImage?: SortOrderInput | SortOrder
    isPlaying?: SortOrder
    ourSongUrl?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    role?: StringWithAggregatesFilter<"Profile"> | string
    name?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    mood?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    moodUpdatedAt?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Profile"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Profile"> | number | null
    trackName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    trackArtist?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    trackImage?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    isPlaying?: BoolWithAggregatesFilter<"Profile"> | boolean
    ourSongUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    text?: StringFilter<"Message"> | string
    translation?: StringNullableFilter<"Message"> | string | null
    hindiTranslation?: StringNullableFilter<"Message"> | string | null
    sender?: StringFilter<"Message"> | string
    receiver?: StringFilter<"Message"> | string
    chatKey?: StringFilter<"Message"> | string
    status?: StringFilter<"Message"> | string
    type?: StringFilter<"Message"> | string
    wordBreakdown?: JsonNullableFilter<"Message">
    imageUrl?: StringNullableFilter<"Message"> | string | null
    audioUrl?: StringNullableFilter<"Message"> | string | null
    unlockAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    isPinned?: BoolFilter<"Message"> | boolean
    parentId?: StringNullableFilter<"Message"> | string | null
    reactions?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    translation?: SortOrderInput | SortOrder
    hindiTranslation?: SortOrderInput | SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    chatKey?: SortOrder
    status?: SortOrder
    type?: SortOrder
    wordBreakdown?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    unlockAt?: SortOrderInput | SortOrder
    isPinned?: SortOrder
    parentId?: SortOrderInput | SortOrder
    reactions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    text?: StringFilter<"Message"> | string
    translation?: StringNullableFilter<"Message"> | string | null
    hindiTranslation?: StringNullableFilter<"Message"> | string | null
    sender?: StringFilter<"Message"> | string
    receiver?: StringFilter<"Message"> | string
    chatKey?: StringFilter<"Message"> | string
    status?: StringFilter<"Message"> | string
    type?: StringFilter<"Message"> | string
    wordBreakdown?: JsonNullableFilter<"Message">
    imageUrl?: StringNullableFilter<"Message"> | string | null
    audioUrl?: StringNullableFilter<"Message"> | string | null
    unlockAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    isPinned?: BoolFilter<"Message"> | boolean
    parentId?: StringNullableFilter<"Message"> | string | null
    reactions?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    translation?: SortOrderInput | SortOrder
    hindiTranslation?: SortOrderInput | SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    chatKey?: SortOrder
    status?: SortOrder
    type?: SortOrder
    wordBreakdown?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    unlockAt?: SortOrderInput | SortOrder
    isPinned?: SortOrder
    parentId?: SortOrderInput | SortOrder
    reactions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    text?: StringWithAggregatesFilter<"Message"> | string
    translation?: StringNullableWithAggregatesFilter<"Message"> | string | null
    hindiTranslation?: StringNullableWithAggregatesFilter<"Message"> | string | null
    sender?: StringWithAggregatesFilter<"Message"> | string
    receiver?: StringWithAggregatesFilter<"Message"> | string
    chatKey?: StringWithAggregatesFilter<"Message"> | string
    status?: StringWithAggregatesFilter<"Message"> | string
    type?: StringWithAggregatesFilter<"Message"> | string
    wordBreakdown?: JsonNullableWithAggregatesFilter<"Message">
    imageUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null
    unlockAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    isPinned?: BoolWithAggregatesFilter<"Message"> | boolean
    parentId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    reactions?: JsonNullableWithAggregatesFilter<"Message">
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type ThreadCommentWhereInput = {
    AND?: ThreadCommentWhereInput | ThreadCommentWhereInput[]
    OR?: ThreadCommentWhereInput[]
    NOT?: ThreadCommentWhereInput | ThreadCommentWhereInput[]
    id?: StringFilter<"ThreadComment"> | string
    messageId?: StringFilter<"ThreadComment"> | string
    content?: StringFilter<"ThreadComment"> | string
    author?: StringFilter<"ThreadComment"> | string
    createdAt?: DateTimeFilter<"ThreadComment"> | Date | string
  }

  export type ThreadCommentOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type ThreadCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ThreadCommentWhereInput | ThreadCommentWhereInput[]
    OR?: ThreadCommentWhereInput[]
    NOT?: ThreadCommentWhereInput | ThreadCommentWhereInput[]
    messageId?: StringFilter<"ThreadComment"> | string
    content?: StringFilter<"ThreadComment"> | string
    author?: StringFilter<"ThreadComment"> | string
    createdAt?: DateTimeFilter<"ThreadComment"> | Date | string
  }, "id">

  export type ThreadCommentOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    _count?: ThreadCommentCountOrderByAggregateInput
    _max?: ThreadCommentMaxOrderByAggregateInput
    _min?: ThreadCommentMinOrderByAggregateInput
  }

  export type ThreadCommentScalarWhereWithAggregatesInput = {
    AND?: ThreadCommentScalarWhereWithAggregatesInput | ThreadCommentScalarWhereWithAggregatesInput[]
    OR?: ThreadCommentScalarWhereWithAggregatesInput[]
    NOT?: ThreadCommentScalarWhereWithAggregatesInput | ThreadCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ThreadComment"> | string
    messageId?: StringWithAggregatesFilter<"ThreadComment"> | string
    content?: StringWithAggregatesFilter<"ThreadComment"> | string
    author?: StringWithAggregatesFilter<"ThreadComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ThreadComment"> | Date | string
  }

  export type GlobalSettingsWhereInput = {
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    id?: StringFilter<"GlobalSettings"> | string
    stopEffects?: BoolFilter<"GlobalSettings"> | boolean
    updatedBy?: StringNullableFilter<"GlobalSettings"> | string | null
    updatedAt?: DateTimeFilter<"GlobalSettings"> | Date | string
  }

  export type GlobalSettingsOrderByWithRelationInput = {
    id?: SortOrder
    stopEffects?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    stopEffects?: BoolFilter<"GlobalSettings"> | boolean
    updatedBy?: StringNullableFilter<"GlobalSettings"> | string | null
    updatedAt?: DateTimeFilter<"GlobalSettings"> | Date | string
  }, "id">

  export type GlobalSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    stopEffects?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: GlobalSettingsCountOrderByAggregateInput
    _max?: GlobalSettingsMaxOrderByAggregateInput
    _min?: GlobalSettingsMinOrderByAggregateInput
  }

  export type GlobalSettingsScalarWhereWithAggregatesInput = {
    AND?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    OR?: GlobalSettingsScalarWhereWithAggregatesInput[]
    NOT?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GlobalSettings"> | string
    stopEffects?: BoolWithAggregatesFilter<"GlobalSettings"> | boolean
    updatedBy?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"GlobalSettings"> | Date | string
  }

  export type JarNoteWhereInput = {
    AND?: JarNoteWhereInput | JarNoteWhereInput[]
    OR?: JarNoteWhereInput[]
    NOT?: JarNoteWhereInput | JarNoteWhereInput[]
    id?: StringFilter<"JarNote"> | string
    content?: StringFilter<"JarNote"> | string
    author?: StringFilter<"JarNote"> | string
    createdAt?: DateTimeFilter<"JarNote"> | Date | string
  }

  export type JarNoteOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type JarNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JarNoteWhereInput | JarNoteWhereInput[]
    OR?: JarNoteWhereInput[]
    NOT?: JarNoteWhereInput | JarNoteWhereInput[]
    content?: StringFilter<"JarNote"> | string
    author?: StringFilter<"JarNote"> | string
    createdAt?: DateTimeFilter<"JarNote"> | Date | string
  }, "id">

  export type JarNoteOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
    _count?: JarNoteCountOrderByAggregateInput
    _max?: JarNoteMaxOrderByAggregateInput
    _min?: JarNoteMinOrderByAggregateInput
  }

  export type JarNoteScalarWhereWithAggregatesInput = {
    AND?: JarNoteScalarWhereWithAggregatesInput | JarNoteScalarWhereWithAggregatesInput[]
    OR?: JarNoteScalarWhereWithAggregatesInput[]
    NOT?: JarNoteScalarWhereWithAggregatesInput | JarNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JarNote"> | string
    content?: StringWithAggregatesFilter<"JarNote"> | string
    author?: StringWithAggregatesFilter<"JarNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JarNote"> | Date | string
  }

  export type LoveNoteWhereInput = {
    AND?: LoveNoteWhereInput | LoveNoteWhereInput[]
    OR?: LoveNoteWhereInput[]
    NOT?: LoveNoteWhereInput | LoveNoteWhereInput[]
    id?: StringFilter<"LoveNote"> | string
    content?: StringNullableFilter<"LoveNote"> | string | null
    imageUrl?: StringNullableFilter<"LoveNote"> | string | null
    sender?: StringFilter<"LoveNote"> | string
    x?: FloatFilter<"LoveNote"> | number
    y?: FloatFilter<"LoveNote"> | number
    rotation?: FloatFilter<"LoveNote"> | number
    createdAt?: DateTimeFilter<"LoveNote"> | Date | string
  }

  export type LoveNoteOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    sender?: SortOrder
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
    createdAt?: SortOrder
  }

  export type LoveNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoveNoteWhereInput | LoveNoteWhereInput[]
    OR?: LoveNoteWhereInput[]
    NOT?: LoveNoteWhereInput | LoveNoteWhereInput[]
    content?: StringNullableFilter<"LoveNote"> | string | null
    imageUrl?: StringNullableFilter<"LoveNote"> | string | null
    sender?: StringFilter<"LoveNote"> | string
    x?: FloatFilter<"LoveNote"> | number
    y?: FloatFilter<"LoveNote"> | number
    rotation?: FloatFilter<"LoveNote"> | number
    createdAt?: DateTimeFilter<"LoveNote"> | Date | string
  }, "id">

  export type LoveNoteOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    sender?: SortOrder
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
    createdAt?: SortOrder
    _count?: LoveNoteCountOrderByAggregateInput
    _avg?: LoveNoteAvgOrderByAggregateInput
    _max?: LoveNoteMaxOrderByAggregateInput
    _min?: LoveNoteMinOrderByAggregateInput
    _sum?: LoveNoteSumOrderByAggregateInput
  }

  export type LoveNoteScalarWhereWithAggregatesInput = {
    AND?: LoveNoteScalarWhereWithAggregatesInput | LoveNoteScalarWhereWithAggregatesInput[]
    OR?: LoveNoteScalarWhereWithAggregatesInput[]
    NOT?: LoveNoteScalarWhereWithAggregatesInput | LoveNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoveNote"> | string
    content?: StringNullableWithAggregatesFilter<"LoveNote"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"LoveNote"> | string | null
    sender?: StringWithAggregatesFilter<"LoveNote"> | string
    x?: FloatWithAggregatesFilter<"LoveNote"> | number
    y?: FloatWithAggregatesFilter<"LoveNote"> | number
    rotation?: FloatWithAggregatesFilter<"LoveNote"> | number
    createdAt?: DateTimeWithAggregatesFilter<"LoveNote"> | Date | string
  }

  export type MilestoneWhereInput = {
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    id?: StringFilter<"Milestone"> | string
    title?: StringFilter<"Milestone"> | string
    date?: DateTimeFilter<"Milestone"> | Date | string
    type?: StringFilter<"Milestone"> | string
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
  }

  export type MilestoneOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type MilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    title?: StringFilter<"Milestone"> | string
    date?: DateTimeFilter<"Milestone"> | Date | string
    type?: StringFilter<"Milestone"> | string
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
  }, "id">

  export type MilestoneOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: MilestoneCountOrderByAggregateInput
    _max?: MilestoneMaxOrderByAggregateInput
    _min?: MilestoneMinOrderByAggregateInput
  }

  export type MilestoneScalarWhereWithAggregatesInput = {
    AND?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    OR?: MilestoneScalarWhereWithAggregatesInput[]
    NOT?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Milestone"> | string
    title?: StringWithAggregatesFilter<"Milestone"> | string
    date?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    type?: StringWithAggregatesFilter<"Milestone"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
  }

  export type LoginHistoryWhereInput = {
    AND?: LoginHistoryWhereInput | LoginHistoryWhereInput[]
    OR?: LoginHistoryWhereInput[]
    NOT?: LoginHistoryWhereInput | LoginHistoryWhereInput[]
    id?: StringFilter<"LoginHistory"> | string
    role?: StringFilter<"LoginHistory"> | string
    timestamp?: DateTimeFilter<"LoginHistory"> | Date | string
  }

  export type LoginHistoryOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    timestamp?: SortOrder
  }

  export type LoginHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoginHistoryWhereInput | LoginHistoryWhereInput[]
    OR?: LoginHistoryWhereInput[]
    NOT?: LoginHistoryWhereInput | LoginHistoryWhereInput[]
    role?: StringFilter<"LoginHistory"> | string
    timestamp?: DateTimeFilter<"LoginHistory"> | Date | string
  }, "id">

  export type LoginHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    timestamp?: SortOrder
    _count?: LoginHistoryCountOrderByAggregateInput
    _max?: LoginHistoryMaxOrderByAggregateInput
    _min?: LoginHistoryMinOrderByAggregateInput
  }

  export type LoginHistoryScalarWhereWithAggregatesInput = {
    AND?: LoginHistoryScalarWhereWithAggregatesInput | LoginHistoryScalarWhereWithAggregatesInput[]
    OR?: LoginHistoryScalarWhereWithAggregatesInput[]
    NOT?: LoginHistoryScalarWhereWithAggregatesInput | LoginHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoginHistory"> | string
    role?: StringWithAggregatesFilter<"LoginHistory"> | string
    timestamp?: DateTimeWithAggregatesFilter<"LoginHistory"> | Date | string
  }

  export type ImageWhereInput = {
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    id?: StringFilter<"Image"> | string
    cloudinaryId?: StringFilter<"Image"> | string
    url?: StringFilter<"Image"> | string
    sender?: StringFilter<"Image"> | string
    receiver?: StringFilter<"Image"> | string
    viewType?: StringFilter<"Image"> | string
    viewed?: BoolFilter<"Image"> | boolean
    createdAt?: DateTimeFilter<"Image"> | Date | string
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    cloudinaryId?: SortOrder
    url?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    viewType?: SortOrder
    viewed?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    cloudinaryId?: StringFilter<"Image"> | string
    url?: StringFilter<"Image"> | string
    sender?: StringFilter<"Image"> | string
    receiver?: StringFilter<"Image"> | string
    viewType?: StringFilter<"Image"> | string
    viewed?: BoolFilter<"Image"> | boolean
    createdAt?: DateTimeFilter<"Image"> | Date | string
  }, "id">

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    cloudinaryId?: SortOrder
    url?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    viewType?: SortOrder
    viewed?: SortOrder
    createdAt?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    OR?: ImageScalarWhereWithAggregatesInput[]
    NOT?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Image"> | string
    cloudinaryId?: StringWithAggregatesFilter<"Image"> | string
    url?: StringWithAggregatesFilter<"Image"> | string
    sender?: StringWithAggregatesFilter<"Image"> | string
    receiver?: StringWithAggregatesFilter<"Image"> | string
    viewType?: StringWithAggregatesFilter<"Image"> | string
    viewed?: BoolWithAggregatesFilter<"Image"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Image"> | Date | string
  }

  export type ChatActivityWhereInput = {
    AND?: ChatActivityWhereInput | ChatActivityWhereInput[]
    OR?: ChatActivityWhereInput[]
    NOT?: ChatActivityWhereInput | ChatActivityWhereInput[]
    id?: StringFilter<"ChatActivity"> | string
    date?: StringFilter<"ChatActivity"> | string
    sajidActive?: BoolFilter<"ChatActivity"> | boolean
    nasywaActive?: BoolFilter<"ChatActivity"> | boolean
    messageCount?: IntFilter<"ChatActivity"> | number
    createdAt?: DateTimeFilter<"ChatActivity"> | Date | string
    updatedAt?: DateTimeFilter<"ChatActivity"> | Date | string
  }

  export type ChatActivityOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    sajidActive?: SortOrder
    nasywaActive?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: string
    AND?: ChatActivityWhereInput | ChatActivityWhereInput[]
    OR?: ChatActivityWhereInput[]
    NOT?: ChatActivityWhereInput | ChatActivityWhereInput[]
    sajidActive?: BoolFilter<"ChatActivity"> | boolean
    nasywaActive?: BoolFilter<"ChatActivity"> | boolean
    messageCount?: IntFilter<"ChatActivity"> | number
    createdAt?: DateTimeFilter<"ChatActivity"> | Date | string
    updatedAt?: DateTimeFilter<"ChatActivity"> | Date | string
  }, "id" | "date">

  export type ChatActivityOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    sajidActive?: SortOrder
    nasywaActive?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatActivityCountOrderByAggregateInput
    _avg?: ChatActivityAvgOrderByAggregateInput
    _max?: ChatActivityMaxOrderByAggregateInput
    _min?: ChatActivityMinOrderByAggregateInput
    _sum?: ChatActivitySumOrderByAggregateInput
  }

  export type ChatActivityScalarWhereWithAggregatesInput = {
    AND?: ChatActivityScalarWhereWithAggregatesInput | ChatActivityScalarWhereWithAggregatesInput[]
    OR?: ChatActivityScalarWhereWithAggregatesInput[]
    NOT?: ChatActivityScalarWhereWithAggregatesInput | ChatActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatActivity"> | string
    date?: StringWithAggregatesFilter<"ChatActivity"> | string
    sajidActive?: BoolWithAggregatesFilter<"ChatActivity"> | boolean
    nasywaActive?: BoolWithAggregatesFilter<"ChatActivity"> | boolean
    messageCount?: IntWithAggregatesFilter<"ChatActivity"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ChatActivity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChatActivity"> | Date | string
  }

  export type PlaylistSongWhereInput = {
    AND?: PlaylistSongWhereInput | PlaylistSongWhereInput[]
    OR?: PlaylistSongWhereInput[]
    NOT?: PlaylistSongWhereInput | PlaylistSongWhereInput[]
    id?: StringFilter<"PlaylistSong"> | string
    url?: StringFilter<"PlaylistSong"> | string
    title?: StringFilter<"PlaylistSong"> | string
    effect?: StringFilter<"PlaylistSong"> | string
    chatKey?: StringFilter<"PlaylistSong"> | string
    order?: IntFilter<"PlaylistSong"> | number
    createdAt?: DateTimeFilter<"PlaylistSong"> | Date | string
  }

  export type PlaylistSongOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    effect?: SortOrder
    chatKey?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistSongWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlaylistSongWhereInput | PlaylistSongWhereInput[]
    OR?: PlaylistSongWhereInput[]
    NOT?: PlaylistSongWhereInput | PlaylistSongWhereInput[]
    url?: StringFilter<"PlaylistSong"> | string
    title?: StringFilter<"PlaylistSong"> | string
    effect?: StringFilter<"PlaylistSong"> | string
    chatKey?: StringFilter<"PlaylistSong"> | string
    order?: IntFilter<"PlaylistSong"> | number
    createdAt?: DateTimeFilter<"PlaylistSong"> | Date | string
  }, "id">

  export type PlaylistSongOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    effect?: SortOrder
    chatKey?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    _count?: PlaylistSongCountOrderByAggregateInput
    _avg?: PlaylistSongAvgOrderByAggregateInput
    _max?: PlaylistSongMaxOrderByAggregateInput
    _min?: PlaylistSongMinOrderByAggregateInput
    _sum?: PlaylistSongSumOrderByAggregateInput
  }

  export type PlaylistSongScalarWhereWithAggregatesInput = {
    AND?: PlaylistSongScalarWhereWithAggregatesInput | PlaylistSongScalarWhereWithAggregatesInput[]
    OR?: PlaylistSongScalarWhereWithAggregatesInput[]
    NOT?: PlaylistSongScalarWhereWithAggregatesInput | PlaylistSongScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlaylistSong"> | string
    url?: StringWithAggregatesFilter<"PlaylistSong"> | string
    title?: StringWithAggregatesFilter<"PlaylistSong"> | string
    effect?: StringWithAggregatesFilter<"PlaylistSong"> | string
    chatKey?: StringWithAggregatesFilter<"PlaylistSong"> | string
    order?: IntWithAggregatesFilter<"PlaylistSong"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PlaylistSong"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    text?: StringFilter<"Activity"> | string
    imageUrl?: StringNullableFilter<"Activity"> | string | null
    sender?: StringFilter<"Activity"> | string
    status?: StringFilter<"Activity"> | string
    date?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
    reactions?: JsonNullableFilter<"Activity">
    comments?: ActivityCommentListRelationFilter
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    sender?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reactions?: SortOrderInput | SortOrder
    comments?: ActivityCommentOrderByRelationAggregateInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    text?: StringFilter<"Activity"> | string
    imageUrl?: StringNullableFilter<"Activity"> | string | null
    sender?: StringFilter<"Activity"> | string
    status?: StringFilter<"Activity"> | string
    date?: StringFilter<"Activity"> | string
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    updatedAt?: DateTimeFilter<"Activity"> | Date | string
    reactions?: JsonNullableFilter<"Activity">
    comments?: ActivityCommentListRelationFilter
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    sender?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reactions?: SortOrderInput | SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    text?: StringWithAggregatesFilter<"Activity"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    sender?: StringWithAggregatesFilter<"Activity"> | string
    status?: StringWithAggregatesFilter<"Activity"> | string
    date?: StringWithAggregatesFilter<"Activity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    reactions?: JsonNullableWithAggregatesFilter<"Activity">
  }

  export type ActivityCommentWhereInput = {
    AND?: ActivityCommentWhereInput | ActivityCommentWhereInput[]
    OR?: ActivityCommentWhereInput[]
    NOT?: ActivityCommentWhereInput | ActivityCommentWhereInput[]
    id?: StringFilter<"ActivityComment"> | string
    text?: StringFilter<"ActivityComment"> | string
    sender?: StringFilter<"ActivityComment"> | string
    activityId?: StringFilter<"ActivityComment"> | string
    createdAt?: DateTimeFilter<"ActivityComment"> | Date | string
    activity?: XOR<ActivityScalarRelationFilter, ActivityWhereInput>
  }

  export type ActivityCommentOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    sender?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
    activity?: ActivityOrderByWithRelationInput
  }

  export type ActivityCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityCommentWhereInput | ActivityCommentWhereInput[]
    OR?: ActivityCommentWhereInput[]
    NOT?: ActivityCommentWhereInput | ActivityCommentWhereInput[]
    text?: StringFilter<"ActivityComment"> | string
    sender?: StringFilter<"ActivityComment"> | string
    activityId?: StringFilter<"ActivityComment"> | string
    createdAt?: DateTimeFilter<"ActivityComment"> | Date | string
    activity?: XOR<ActivityScalarRelationFilter, ActivityWhereInput>
  }, "id">

  export type ActivityCommentOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    sender?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
    _count?: ActivityCommentCountOrderByAggregateInput
    _max?: ActivityCommentMaxOrderByAggregateInput
    _min?: ActivityCommentMinOrderByAggregateInput
  }

  export type ActivityCommentScalarWhereWithAggregatesInput = {
    AND?: ActivityCommentScalarWhereWithAggregatesInput | ActivityCommentScalarWhereWithAggregatesInput[]
    OR?: ActivityCommentScalarWhereWithAggregatesInput[]
    NOT?: ActivityCommentScalarWhereWithAggregatesInput | ActivityCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityComment"> | string
    text?: StringWithAggregatesFilter<"ActivityComment"> | string
    sender?: StringWithAggregatesFilter<"ActivityComment"> | string
    activityId?: StringWithAggregatesFilter<"ActivityComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActivityComment"> | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    key: string
    status?: string
    usage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    key: string
    status?: string
    usage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    usage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    usage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    key: string
    status?: string
    usage?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    usage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    usage?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    role: string
    name: string
    email?: string | null
    avatarUrl?: string | null
    mood?: string | null
    moodUpdatedAt?: Date | string | null
    latitude?: number | null
    longitude?: number | null
    trackName?: string | null
    trackArtist?: string | null
    trackImage?: string | null
    isPlaying?: boolean
    ourSongUrl?: string | null
    updatedAt?: Date | string
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    role: string
    name: string
    email?: string | null
    avatarUrl?: string | null
    mood?: string | null
    moodUpdatedAt?: Date | string | null
    latitude?: number | null
    longitude?: number | null
    trackName?: string | null
    trackArtist?: string | null
    trackImage?: string | null
    isPlaying?: boolean
    ourSongUrl?: string | null
    updatedAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    moodUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    trackName?: NullableStringFieldUpdateOperationsInput | string | null
    trackArtist?: NullableStringFieldUpdateOperationsInput | string | null
    trackImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    ourSongUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    moodUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    trackName?: NullableStringFieldUpdateOperationsInput | string | null
    trackArtist?: NullableStringFieldUpdateOperationsInput | string | null
    trackImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    ourSongUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    role: string
    name: string
    email?: string | null
    avatarUrl?: string | null
    mood?: string | null
    moodUpdatedAt?: Date | string | null
    latitude?: number | null
    longitude?: number | null
    trackName?: string | null
    trackArtist?: string | null
    trackImage?: string | null
    isPlaying?: boolean
    ourSongUrl?: string | null
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    moodUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    trackName?: NullableStringFieldUpdateOperationsInput | string | null
    trackArtist?: NullableStringFieldUpdateOperationsInput | string | null
    trackImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    ourSongUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    moodUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    trackName?: NullableStringFieldUpdateOperationsInput | string | null
    trackArtist?: NullableStringFieldUpdateOperationsInput | string | null
    trackImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    ourSongUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    text: string
    translation?: string | null
    hindiTranslation?: string | null
    sender: string
    receiver: string
    chatKey: string
    status?: string
    type?: string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    audioUrl?: string | null
    unlockAt?: Date | string | null
    isPinned?: boolean
    parentId?: string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    text: string
    translation?: string | null
    hindiTranslation?: string | null
    sender: string
    receiver: string
    chatKey: string
    status?: string
    type?: string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    audioUrl?: string | null
    unlockAt?: Date | string | null
    isPinned?: boolean
    parentId?: string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    hindiTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    unlockAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    hindiTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    unlockAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    text: string
    translation?: string | null
    hindiTranslation?: string | null
    sender: string
    receiver: string
    chatKey: string
    status?: string
    type?: string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    audioUrl?: string | null
    unlockAt?: Date | string | null
    isPinned?: boolean
    parentId?: string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    hindiTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    unlockAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    hindiTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    wordBreakdown?: NullableJsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    unlockAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    reactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCommentCreateInput = {
    id?: string
    messageId: string
    content: string
    author: string
    createdAt?: Date | string
  }

  export type ThreadCommentUncheckedCreateInput = {
    id?: string
    messageId: string
    content: string
    author: string
    createdAt?: Date | string
  }

  export type ThreadCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCommentCreateManyInput = {
    id?: string
    messageId: string
    content: string
    author: string
    createdAt?: Date | string
  }

  export type ThreadCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateInput = {
    id?: string
    stopEffects?: boolean
    updatedBy?: string | null
    updatedAt?: Date | string
  }

  export type GlobalSettingsUncheckedCreateInput = {
    id?: string
    stopEffects?: boolean
    updatedBy?: string | null
    updatedAt?: Date | string
  }

  export type GlobalSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopEffects?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopEffects?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateManyInput = {
    id?: string
    stopEffects?: boolean
    updatedBy?: string | null
    updatedAt?: Date | string
  }

  export type GlobalSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopEffects?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stopEffects?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JarNoteCreateInput = {
    id?: string
    content: string
    author: string
    createdAt?: Date | string
  }

  export type JarNoteUncheckedCreateInput = {
    id?: string
    content: string
    author: string
    createdAt?: Date | string
  }

  export type JarNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JarNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JarNoteCreateManyInput = {
    id?: string
    content: string
    author: string
    createdAt?: Date | string
  }

  export type JarNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JarNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoveNoteCreateInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    sender: string
    x?: number
    y?: number
    rotation?: number
    createdAt?: Date | string
  }

  export type LoveNoteUncheckedCreateInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    sender: string
    x?: number
    y?: number
    rotation?: number
    createdAt?: Date | string
  }

  export type LoveNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoveNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoveNoteCreateManyInput = {
    id?: string
    content?: string | null
    imageUrl?: string | null
    sender: string
    x?: number
    y?: number
    rotation?: number
    createdAt?: Date | string
  }

  export type LoveNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoveNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    x?: FloatFieldUpdateOperationsInput | number
    y?: FloatFieldUpdateOperationsInput | number
    rotation?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateInput = {
    id?: string
    title: string
    date: Date | string
    type?: string
    createdAt?: Date | string
  }

  export type MilestoneUncheckedCreateInput = {
    id?: string
    title: string
    date: Date | string
    type?: string
    createdAt?: Date | string
  }

  export type MilestoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateManyInput = {
    id?: string
    title: string
    date: Date | string
    type?: string
    createdAt?: Date | string
  }

  export type MilestoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginHistoryCreateInput = {
    id?: string
    role: string
    timestamp?: Date | string
  }

  export type LoginHistoryUncheckedCreateInput = {
    id?: string
    role: string
    timestamp?: Date | string
  }

  export type LoginHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginHistoryCreateManyInput = {
    id?: string
    role: string
    timestamp?: Date | string
  }

  export type LoginHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateInput = {
    id?: string
    cloudinaryId: string
    url: string
    sender: string
    receiver: string
    viewType?: string
    viewed?: boolean
    createdAt?: Date | string
  }

  export type ImageUncheckedCreateInput = {
    id?: string
    cloudinaryId: string
    url: string
    sender: string
    receiver: string
    viewType?: string
    viewed?: boolean
    createdAt?: Date | string
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    viewType?: StringFieldUpdateOperationsInput | string
    viewed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    viewType?: StringFieldUpdateOperationsInput | string
    viewed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateManyInput = {
    id?: string
    cloudinaryId: string
    url: string
    sender: string
    receiver: string
    viewType?: string
    viewed?: boolean
    createdAt?: Date | string
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    viewType?: StringFieldUpdateOperationsInput | string
    viewed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    receiver?: StringFieldUpdateOperationsInput | string
    viewType?: StringFieldUpdateOperationsInput | string
    viewed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatActivityCreateInput = {
    id?: string
    date: string
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatActivityUncheckedCreateInput = {
    id?: string
    date: string
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    sajidActive?: BoolFieldUpdateOperationsInput | boolean
    nasywaActive?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    sajidActive?: BoolFieldUpdateOperationsInput | boolean
    nasywaActive?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatActivityCreateManyInput = {
    id?: string
    date: string
    sajidActive?: boolean
    nasywaActive?: boolean
    messageCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    sajidActive?: BoolFieldUpdateOperationsInput | boolean
    nasywaActive?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    sajidActive?: BoolFieldUpdateOperationsInput | boolean
    nasywaActive?: BoolFieldUpdateOperationsInput | boolean
    messageCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistSongCreateInput = {
    id?: string
    url: string
    title: string
    effect: string
    chatKey: string
    order?: number
    createdAt?: Date | string
  }

  export type PlaylistSongUncheckedCreateInput = {
    id?: string
    url: string
    title: string
    effect: string
    chatKey: string
    order?: number
    createdAt?: Date | string
  }

  export type PlaylistSongUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    effect?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistSongUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    effect?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistSongCreateManyInput = {
    id?: string
    url: string
    title: string
    effect: string
    chatKey: string
    order?: number
    createdAt?: Date | string
  }

  export type PlaylistSongUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    effect?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistSongUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    effect?: StringFieldUpdateOperationsInput | string
    chatKey?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    id?: string
    text: string
    imageUrl?: string | null
    sender: string
    status?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
    comments?: ActivityCommentCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    text: string
    imageUrl?: string | null
    sender: string
    status?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
    comments?: ActivityCommentUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
    comments?: ActivityCommentUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
    comments?: ActivityCommentUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityCreateManyInput = {
    id?: string
    text: string
    imageUrl?: string | null
    sender: string
    status?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityCommentCreateInput = {
    id?: string
    text: string
    sender: string
    createdAt?: Date | string
    activity: ActivityCreateNestedOneWithoutCommentsInput
  }

  export type ActivityCommentUncheckedCreateInput = {
    id?: string
    text: string
    sender: string
    activityId: string
    createdAt?: Date | string
  }

  export type ActivityCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activity?: ActivityUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type ActivityCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    activityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCommentCreateManyInput = {
    id?: string
    text: string
    sender: string
    activityId: string
    createdAt?: Date | string
  }

  export type ActivityCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    activityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    status?: SortOrder
    usage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyAvgOrderByAggregateInput = {
    usage?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    status?: SortOrder
    usage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    status?: SortOrder
    usage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeySumOrderByAggregateInput = {
    usage?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    mood?: SortOrder
    moodUpdatedAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    trackName?: SortOrder
    trackArtist?: SortOrder
    trackImage?: SortOrder
    isPlaying?: SortOrder
    ourSongUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    mood?: SortOrder
    moodUpdatedAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    trackName?: SortOrder
    trackArtist?: SortOrder
    trackImage?: SortOrder
    isPlaying?: SortOrder
    ourSongUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    mood?: SortOrder
    moodUpdatedAt?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    trackName?: SortOrder
    trackArtist?: SortOrder
    trackImage?: SortOrder
    isPlaying?: SortOrder
    ourSongUrl?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    translation?: SortOrder
    hindiTranslation?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    chatKey?: SortOrder
    status?: SortOrder
    type?: SortOrder
    wordBreakdown?: SortOrder
    imageUrl?: SortOrder
    audioUrl?: SortOrder
    unlockAt?: SortOrder
    isPinned?: SortOrder
    parentId?: SortOrder
    reactions?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    translation?: SortOrder
    hindiTranslation?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    chatKey?: SortOrder
    status?: SortOrder
    type?: SortOrder
    imageUrl?: SortOrder
    audioUrl?: SortOrder
    unlockAt?: SortOrder
    isPinned?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    translation?: SortOrder
    hindiTranslation?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    chatKey?: SortOrder
    status?: SortOrder
    type?: SortOrder
    imageUrl?: SortOrder
    audioUrl?: SortOrder
    unlockAt?: SortOrder
    isPinned?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ThreadCommentCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type ThreadCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type ThreadCommentMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type GlobalSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    stopEffects?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    stopEffects?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    stopEffects?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type JarNoteCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type JarNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type JarNoteMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LoveNoteCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    sender?: SortOrder
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
    createdAt?: SortOrder
  }

  export type LoveNoteAvgOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
  }

  export type LoveNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    sender?: SortOrder
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
    createdAt?: SortOrder
  }

  export type LoveNoteMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    sender?: SortOrder
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
    createdAt?: SortOrder
  }

  export type LoveNoteSumOrderByAggregateInput = {
    x?: SortOrder
    y?: SortOrder
    rotation?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type MilestoneCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type MilestoneMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type MilestoneMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type LoginHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    timestamp?: SortOrder
  }

  export type LoginHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    timestamp?: SortOrder
  }

  export type LoginHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    timestamp?: SortOrder
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    cloudinaryId?: SortOrder
    url?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    viewType?: SortOrder
    viewed?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    cloudinaryId?: SortOrder
    url?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    viewType?: SortOrder
    viewed?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    cloudinaryId?: SortOrder
    url?: SortOrder
    sender?: SortOrder
    receiver?: SortOrder
    viewType?: SortOrder
    viewed?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatActivityCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sajidActive?: SortOrder
    nasywaActive?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatActivityAvgOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type ChatActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sajidActive?: SortOrder
    nasywaActive?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatActivityMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    sajidActive?: SortOrder
    nasywaActive?: SortOrder
    messageCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatActivitySumOrderByAggregateInput = {
    messageCount?: SortOrder
  }

  export type PlaylistSongCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    effect?: SortOrder
    chatKey?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistSongAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PlaylistSongMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    effect?: SortOrder
    chatKey?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistSongMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    effect?: SortOrder
    chatKey?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistSongSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ActivityCommentListRelationFilter = {
    every?: ActivityCommentWhereInput
    some?: ActivityCommentWhereInput
    none?: ActivityCommentWhereInput
  }

  export type ActivityCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    sender?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reactions?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    sender?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    imageUrl?: SortOrder
    sender?: SortOrder
    status?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityScalarRelationFilter = {
    is?: ActivityWhereInput
    isNot?: ActivityWhereInput
  }

  export type ActivityCommentCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    sender?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    sender?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityCommentMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    sender?: SortOrder
    activityId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivityCommentCreateNestedManyWithoutActivityInput = {
    create?: XOR<ActivityCommentCreateWithoutActivityInput, ActivityCommentUncheckedCreateWithoutActivityInput> | ActivityCommentCreateWithoutActivityInput[] | ActivityCommentUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ActivityCommentCreateOrConnectWithoutActivityInput | ActivityCommentCreateOrConnectWithoutActivityInput[]
    createMany?: ActivityCommentCreateManyActivityInputEnvelope
    connect?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
  }

  export type ActivityCommentUncheckedCreateNestedManyWithoutActivityInput = {
    create?: XOR<ActivityCommentCreateWithoutActivityInput, ActivityCommentUncheckedCreateWithoutActivityInput> | ActivityCommentCreateWithoutActivityInput[] | ActivityCommentUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ActivityCommentCreateOrConnectWithoutActivityInput | ActivityCommentCreateOrConnectWithoutActivityInput[]
    createMany?: ActivityCommentCreateManyActivityInputEnvelope
    connect?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
  }

  export type ActivityCommentUpdateManyWithoutActivityNestedInput = {
    create?: XOR<ActivityCommentCreateWithoutActivityInput, ActivityCommentUncheckedCreateWithoutActivityInput> | ActivityCommentCreateWithoutActivityInput[] | ActivityCommentUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ActivityCommentCreateOrConnectWithoutActivityInput | ActivityCommentCreateOrConnectWithoutActivityInput[]
    upsert?: ActivityCommentUpsertWithWhereUniqueWithoutActivityInput | ActivityCommentUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: ActivityCommentCreateManyActivityInputEnvelope
    set?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    disconnect?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    delete?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    connect?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    update?: ActivityCommentUpdateWithWhereUniqueWithoutActivityInput | ActivityCommentUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: ActivityCommentUpdateManyWithWhereWithoutActivityInput | ActivityCommentUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: ActivityCommentScalarWhereInput | ActivityCommentScalarWhereInput[]
  }

  export type ActivityCommentUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: XOR<ActivityCommentCreateWithoutActivityInput, ActivityCommentUncheckedCreateWithoutActivityInput> | ActivityCommentCreateWithoutActivityInput[] | ActivityCommentUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ActivityCommentCreateOrConnectWithoutActivityInput | ActivityCommentCreateOrConnectWithoutActivityInput[]
    upsert?: ActivityCommentUpsertWithWhereUniqueWithoutActivityInput | ActivityCommentUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: ActivityCommentCreateManyActivityInputEnvelope
    set?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    disconnect?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    delete?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    connect?: ActivityCommentWhereUniqueInput | ActivityCommentWhereUniqueInput[]
    update?: ActivityCommentUpdateWithWhereUniqueWithoutActivityInput | ActivityCommentUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: ActivityCommentUpdateManyWithWhereWithoutActivityInput | ActivityCommentUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: ActivityCommentScalarWhereInput | ActivityCommentScalarWhereInput[]
  }

  export type ActivityCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ActivityCreateWithoutCommentsInput, ActivityUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutCommentsInput
    connect?: ActivityWhereUniqueInput
  }

  export type ActivityUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ActivityCreateWithoutCommentsInput, ActivityUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutCommentsInput
    upsert?: ActivityUpsertWithoutCommentsInput
    connect?: ActivityWhereUniqueInput
    update?: XOR<XOR<ActivityUpdateToOneWithWhereWithoutCommentsInput, ActivityUpdateWithoutCommentsInput>, ActivityUncheckedUpdateWithoutCommentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ActivityCommentCreateWithoutActivityInput = {
    id?: string
    text: string
    sender: string
    createdAt?: Date | string
  }

  export type ActivityCommentUncheckedCreateWithoutActivityInput = {
    id?: string
    text: string
    sender: string
    createdAt?: Date | string
  }

  export type ActivityCommentCreateOrConnectWithoutActivityInput = {
    where: ActivityCommentWhereUniqueInput
    create: XOR<ActivityCommentCreateWithoutActivityInput, ActivityCommentUncheckedCreateWithoutActivityInput>
  }

  export type ActivityCommentCreateManyActivityInputEnvelope = {
    data: ActivityCommentCreateManyActivityInput | ActivityCommentCreateManyActivityInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCommentUpsertWithWhereUniqueWithoutActivityInput = {
    where: ActivityCommentWhereUniqueInput
    update: XOR<ActivityCommentUpdateWithoutActivityInput, ActivityCommentUncheckedUpdateWithoutActivityInput>
    create: XOR<ActivityCommentCreateWithoutActivityInput, ActivityCommentUncheckedCreateWithoutActivityInput>
  }

  export type ActivityCommentUpdateWithWhereUniqueWithoutActivityInput = {
    where: ActivityCommentWhereUniqueInput
    data: XOR<ActivityCommentUpdateWithoutActivityInput, ActivityCommentUncheckedUpdateWithoutActivityInput>
  }

  export type ActivityCommentUpdateManyWithWhereWithoutActivityInput = {
    where: ActivityCommentScalarWhereInput
    data: XOR<ActivityCommentUpdateManyMutationInput, ActivityCommentUncheckedUpdateManyWithoutActivityInput>
  }

  export type ActivityCommentScalarWhereInput = {
    AND?: ActivityCommentScalarWhereInput | ActivityCommentScalarWhereInput[]
    OR?: ActivityCommentScalarWhereInput[]
    NOT?: ActivityCommentScalarWhereInput | ActivityCommentScalarWhereInput[]
    id?: StringFilter<"ActivityComment"> | string
    text?: StringFilter<"ActivityComment"> | string
    sender?: StringFilter<"ActivityComment"> | string
    activityId?: StringFilter<"ActivityComment"> | string
    createdAt?: DateTimeFilter<"ActivityComment"> | Date | string
  }

  export type ActivityCreateWithoutCommentsInput = {
    id?: string
    text: string
    imageUrl?: string | null
    sender: string
    status?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityUncheckedCreateWithoutCommentsInput = {
    id?: string
    text: string
    imageUrl?: string | null
    sender: string
    status?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityCreateOrConnectWithoutCommentsInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutCommentsInput, ActivityUncheckedCreateWithoutCommentsInput>
  }

  export type ActivityUpsertWithoutCommentsInput = {
    update: XOR<ActivityUpdateWithoutCommentsInput, ActivityUncheckedUpdateWithoutCommentsInput>
    create: XOR<ActivityCreateWithoutCommentsInput, ActivityUncheckedCreateWithoutCommentsInput>
    where?: ActivityWhereInput
  }

  export type ActivityUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ActivityWhereInput
    data: XOR<ActivityUpdateWithoutCommentsInput, ActivityUncheckedUpdateWithoutCommentsInput>
  }

  export type ActivityUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sender?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ActivityCommentCreateManyActivityInput = {
    id?: string
    text: string
    sender: string
    createdAt?: Date | string
  }

  export type ActivityCommentUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCommentUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCommentUncheckedUpdateManyWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}