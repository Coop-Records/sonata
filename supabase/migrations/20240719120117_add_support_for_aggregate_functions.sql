-- allow aggregate functions
ALTER ROLE "authenticator" SET pgrst.db_aggregates_enabled = 'true';
NOTIFY pgrst, 'reload config';

-- anonymous users can only run cheap queries
ALTER USER "anon" SET plan_filter.statement_cost_limit = 10000;

-- authenticated users can run more expensive queries
ALTER USER "authenticated" SET plan_filter.statement_cost_limit = 1e6;
ALTER USER "service_role" SET plan_filter.statement_cost_limit = 1e6;