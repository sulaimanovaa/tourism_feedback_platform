import { Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SavedServiceService } from './saved-service.service';
import { ControllerDecorator } from 'shared/decorators/controller.decorator';
import { ISavedService, ISavedServiceStatus } from './interfaces/saved-service.interface';
import { ApiGetListSavedServices } from './decorators/get-review-like-count.decorator';
import { ApiToggleSavedService } from './decorators/toggle-review-like.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'shared/guards/jwt.guards';
import { CurrentUserId } from 'shared/decorators/current-user.decorator';

@ControllerDecorator('saved-service')
@ApiBearerAuth('auth')
export class SavedServiceController {
  constructor(private readonly savedServicesService: SavedServiceService) {}

  @ApiToggleSavedService()
  @Post('toggle/:serviceId')
  @UseGuards(AuthGuard)
  async toggle(
    @CurrentUserId() userId,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<ISavedServiceStatus> {
    const result = await this.savedServicesService.toggleSave({ userId, serviceId });
    return result;
  }

  @ApiGetListSavedServices()
  @Get(':userId')
  async getAll(@Param('userId', ParseIntPipe) userId: number): Promise<ISavedService[]> {
    const result = await this.savedServicesService.getSavedServices(userId);
    return result;
  }
}
