<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Clear old data => since old JSON structure != new structure
        DB::table('devices')->truncate();

        // 2. Rename column from 'settings' to 'allowed_settings'
        Schema::table('devices', function (Blueprint $table) {
            $table->renameColumn('settings', 'allowed_settings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('devices', function (Blueprint $table) {
            $table->renameColumn('allowed_settings', 'settings');
        });
    }
};
