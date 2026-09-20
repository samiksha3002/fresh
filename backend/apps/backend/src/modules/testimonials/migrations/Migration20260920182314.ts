import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260920182314 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "testimonial" ("id" text not null, "customer_name" text not null, "customer_email" text null, "rating" integer not null, "review" text not null, "avatar" text null, "product_id" text null, "source" text check ("source" in ('admin', 'customer')) not null default 'customer', "status" text check ("status" in ('pending', 'approved', 'rejected')) not null default 'pending', "is_featured" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "testimonial_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_testimonial_deleted_at" ON "testimonial" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "testimonial" cascade;`);
  }

}
