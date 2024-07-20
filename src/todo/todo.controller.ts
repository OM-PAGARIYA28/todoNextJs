import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEmail } from 'src/common/decorator/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To Add new task",summary:"add new task"})
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto,@UserEmail()
  userEmail : string) {
    console.log("output")
    return await this.todoService.create(createTodoDto,userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To get all task",summary:"get all task of user"})
  @Get()
  
  async findAll(@UserEmail() 
  userEmail:string) {
    console.log(userEmail)
    return this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To get specific task",summary:"to get specific task"})

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To update specific task",summary:"to update specific task"})

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To delete specific task",summary:"to delete specific task"})

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
