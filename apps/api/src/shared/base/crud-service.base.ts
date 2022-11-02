// export abstract class CrudServiceBase<T> {
//   constructor(protected readonly prisma: PrismaService) {}

//   async create(data: Prisma.Prisma__TClient<T>, params?: Prisma.Prisma__TClient<T>) {
//     return this.prisma.t.create({
//       data,
//       ...params,
//     });
//   }

//   async findMany(params?: Prisma.Prisma__TClient<T>) {
//     return this.prisma.t.findMany(params);
//   }

//   async findOne(params: Prisma.Prisma__TClient<T>) {
//     return this.prisma.t.findUnique(params);
//   }

//   async update(params: Prisma.Prisma__TClient<T>) {
//     return this.prisma.t.update(params);
//   }

//   async delete(params: Prisma.Prisma__TClient<T>) {
//     return this.prisma.t.delete(params);
//   }
// }