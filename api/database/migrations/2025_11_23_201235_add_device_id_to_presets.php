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
        DB::table('presets')->truncate();
        Schema::table('presets', function (Blueprint $table) {
            $table->renameColumn('devices', 'configs');
            $table->foreignUuid('device_id')->constrained('devices')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('presets', function (Blueprint $table) {
            //
        });
    }
};
