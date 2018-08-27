import { Injectable } from '@nestjs/common';
import 'automapper-ts';

interface IMemberOpts extends AutoMapperJs.IMemberConfigurationOptions { };
interface ISourceOpts extends AutoMapperJs.ISourceMemberConfigurationOptions { };

@Injectable()
export class MapperService {

    mapper: AutoMapperJs.AutoMapper;

    constructor() {
        this.mapper = automapper;
        this.initializeMapper();
    }

    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);
    }

    private static configure(config: AutoMapperJs.IConfiguration): void {
        // --> Rota User
        config
            .createMap('User', 'UserVm')
            .forSourceMember('id', (opts: ISourceOpts) => opts.ignore())
            .forSourceMember('password', (opts: ISourceOpts) => opts.ignore());

        config
            .createMap('User[]', 'UserVm[]')
            .forSourceMember('password', (opts: ISourceOpts) => opts.ignore())
            .forSourceMember('role', (opts: ISourceOpts) => opts.ignore());

        // --> Rota Todo
        config.createMap('Todo', 'TodoVm')
            .forMember('level', (opts: IMemberOpts) => opts.mapFrom('_level'));

        config.createMap('Todo[]', 'TodoVm[]')
            .forMember('level', (opts: IMemberOpts) => opts.mapFrom('_level'));
    }
}
