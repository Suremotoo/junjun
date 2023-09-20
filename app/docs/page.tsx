"use client";

import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { CheckIcon } from "@/components/icons";

const configCode = {
  db: {
    host: "127.0.0.1",
    user: "<Your Username>",
    password: "<Your Password>",
    database: "<Your Database>",
  },
};

const createSqlCode = `
-- 1. create project table

create table jj_project
(
    id          int auto_increment
        primary key,
    name        varchar(255)                        not null,
    alias_name  varchar(255)                        null,
    description varchar(1000)                       null,
    is_delete   char      default '0'               not null,
    created_at  timestamp default CURRENT_TIMESTAMP null,
    updated_at  timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);

-- 2. create api table
create table jj_api
(
    id           int auto_increment
        primary key,
    project_id   int                                 null,
    name         varchar(255)                        not null,
    description  varchar(1000)                       null,
    endpoint_url varchar(255)                        not null,
    is_delete    char      default '0'               not null,
    created_at   timestamp default CURRENT_TIMESTAMP null,
    updated_at   timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint jj_api_ibfk_1
        foreign key (project_id) references jj_project (id)
);

-- 3. create parameter
create table jj_parameter
(
    id          int auto_increment
        primary key,
    api_id      int                                                              null,
    name        varchar(255)                                                     not null,
    cn_name     varchar(500)                                                     null,
    param_type  enum ('String', 'Integer', 'Number', 'Boolean', 'Date', 'Other') not null,
    description varchar(1000)                                                    null,
    is_required char      default '0'                                            not null,
    is_delete   tinyint   default 0                                              not null,
    created_at  timestamp default CURRENT_TIMESTAMP                              null,
    updated_at  timestamp default CURRENT_TIMESTAMP                              null on update CURRENT_TIMESTAMP,
    constraint jj_parameter_ibfk_1
        foreign key (api_id) references jj_api (id)
);

create index api_id
    on jj_parameter (api_id);


create index project_id
    on jj_api (project_id);

`;
export default function DocsPage() {
  return (
    <>
      <div className="px-6 py-18 lg:px-8">
        <div className="mx-auto max-w-5xl text-base leading-7">
          <p className="text-base font-semibold leading-7 primary">
            Introducing
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Junjun for Beginners
          </h1>
          {/* <p className="mt-6 text-xl leading-8">
           
          </p> */}
          <div className="mt-10 max-w-2xl">
            <ul role="list" className="mt-8 max-w-xl space-y-8">
              <li className="flex gap-x-3">
                <CheckIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold">Init Database</strong>
                  Step 1: Set up your database by executing the following SQL
                  script.
                  <div className="flex flex-wrap gap-4">
                    <Snippet hideSymbol variant="shadow" color="primary">
                      CREATE DATABASE `junjun` DEFAULT CHARACTER SET = `utf8mb4`
                      DEFAULT COLLATE = `utf8mb4_bin`;
                    </Snippet>
                    <Snippet hideSymbol variant="shadow" color="primary">
                      <pre>{createSqlCode}</pre>
                    </Snippet>
                  </div>
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold">Init Database</strong>
                  Step 2: Create your configuration file. Navigate to your
                  <strong> home </strong>
                  directory.
                  <Code>linux/macOS: /home/Your Username</Code>
                  {/* <Code>windows: /home/Your Username</Code> */}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckIcon
                  className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold">Init Database</strong>
                  Create a <Code>junjun.json</Code> file and edit it with your
                  database configurations.
                  <div className="flex flex-wrap gap-4 whitespace-break-spaces">
                    <Snippet
                      hideSymbol
                      variant="shadow"
                      className="whitespace-break-spaces"
                      color="primary"
                    >
                      <pre>{JSON.stringify(configCode, null, 2)}</pre>
                    </Snippet>
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
