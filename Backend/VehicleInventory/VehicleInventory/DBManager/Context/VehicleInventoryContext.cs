using Microsoft.EntityFrameworkCore;
using VehicleInventory.DBManager.Models.Entities;

namespace VehicleInventory.DBManager.Context
{
    public class VehicleInventoryContext : DbContext
    {
        public VehicleInventoryContext(DbContextOptions<VehicleInventoryContext> options) : base(options) { }

        public DbSet<VehicleEntity> Vehicles => Set<VehicleEntity>();
        public DbSet<DriverEntity> Drivers => Set<DriverEntity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<VehicleEntity>()
                .HasOne(x => x.AssignedDriver)
                .WithMany(y => y.Vehicles)
                .HasForeignKey(x => x.DriverId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<VehicleEntity>(entity =>
            {
                entity.HasIndex(x => x.LicensePlate).IsUnique();
                entity.Property(x => x.LicensePlate).IsRequired().HasMaxLength(20);
                entity.Property(x => x.Type).HasConversion<string>();
                entity.Property(x => x.Status).HasConversion<string>();
            });

            modelBuilder.Entity<DriverEntity>(entity =>
            {
                entity.Property(x => x.Level).HasConversion<string>();
            });
        }
    }
}
